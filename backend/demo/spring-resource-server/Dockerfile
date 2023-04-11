FROM eclipse-temurin:20-jdk-alpine
WORKDIR /usr/src/web-bid-app/
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src

EXPOSE 8080
CMD ["./mvnw", "spring-boot:run"]