package com.virtusa.WealthsApp.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Team 2",
                        email = "anmolshah@virtusa.com"
                ),
                description = "Wealth Goals Planner Backend Application",
                title = "Wealth Goals Planner",
                version = "1.0"
//                license = @License(name = "licence name",url = "www.google.com"),
//                termsOfService = "my terms of service written here"
        ),
        servers = {
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080/"
                ),
        }
)
@SecurityScheme(
        name = "JWT Bearer Authentication & Authorization",
        description = "JWT Authorization header using the Bearer scheme. Example: \\\"Authorization: Bearer {token}\\\"",
        scheme = "Bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenAPIConfiguration {
}
