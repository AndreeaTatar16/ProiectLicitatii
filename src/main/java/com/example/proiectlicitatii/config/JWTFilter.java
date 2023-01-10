package com.example.proiectlicitatii.config;

import com.example.proiectlicitatii.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@Component
public class JWTFilter extends OncePerRequestFilter {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // Get authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        String paramToken = request.getParameter("token");
        if ((!StringUtils.hasText(header) && paramToken == null) || (StringUtils.hasText(header) && !header.startsWith("Bearer "))) {
            filterChain.doFilter(request, response);
            return;
        }

        // Get user identity and set it on the spring security context

        String token = null;
        if (header != null) {
            token = header.split(" ")[1].trim();   //va prelua din headerul requestului tokenul jwt, care incepe cu Bearer sbfhfybf.dsdifidjf.....
        }
        //si il imparte intr-un array de 2 stringuri, iar apoi preia valoarea cu indexul 1, adica tokenul
        if (paramToken != null) {
            token = paramToken;
        }
        //cauta dupa token usernameul corespunzator
        UserDetails userDetails = userRepository
                .findByUsername(jwtUtil.getUsernameFromToken(token))
                .orElse(null);

        // Get jwt token and validate
        if (!jwtUtil.validateToken(token, userDetails)) {
            filterChain.doFilter(request, response);
            return;
        }

        //daca usernameul e corect si exista, atunci ii dam un rol
        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails == null ?
                        List.of() : userDetails.getAuthorities()
        );

        authentication.setDetails(   //reprezentarea username si parola
                new WebAuthenticationDetailsSource().buildDetails(request)
        );

        //spring security pune userul in "contextul" aplicatiei prin faptul ca l-a trecut prin toate filtrele lui si e autentificat
        SecurityContextHolder.getContext().setAuthentication(authentication);  //userul e acum validat
        filterChain.doFilter(request, response);
    }
}
