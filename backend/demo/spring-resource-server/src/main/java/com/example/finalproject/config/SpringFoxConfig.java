package com.example.finalproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ForwardedHeaderFilter;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@Configuration
public class SpringFoxConfig {
  @Bean
  ForwardedHeaderFilter forwardedHeaderFilter() {
    return new ForwardedHeaderFilter();
  }
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
            .groupName("public-api")
            .apiInfo(apiInfo())
            .select()
            .paths(PathSelectors.any())
            .build();
  }

  private ApiInfo apiInfo() {
    return new ApiInfoBuilder().title("Web Bid API")
            .description("JavaInUse API reference for developers")
            .termsOfServiceUrl("http://javainuse.com")
            .contact(new Contact("Vũ Hoaàng Dũng", "", "vhngdng@gmail.com")).license("Dung")
            .licenseUrl("vhngdng@gmail.com").version("1.0").build();
  }
}
