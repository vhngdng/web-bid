FROM eclipse-temurin:20-jdk-alpine
WORKDIR /usr/src/web-bid-app/
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
# ARG SPRING_PROFILES_ACTIVE=${PROPERTY}
ENV SPRING_PROFILES_ACTIVE=dev

EXPOSE 8080
# ENTRYPOINT [ "java", "-Dspring.profiles.active=$SPRING_PROFILES_ACTIVE", "-jar", "/app.jar" ]
CMD ["./mvnw", "spring-boot:run", "-Dspring.profiles.active=$SPRING_PROFILES_ACTIVE"]