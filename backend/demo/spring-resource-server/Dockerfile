FROM eclipse-temurin:20-jdk-alpine
WORKDIR /usr/src/web-bid-app/
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
ENV SPRING_PROFILES_ACTIVE=local
ENV JWT_SECRET="234672789shdgjhs.//sd8a789da68123./217sdfs7882.23423./242378ksda/,2/4,2/sd23879423"
EXPOSE 8080
# ENTRYPOINT [ "java", "-Dspring.profiles.active=$SPRING_PROFILES_ACTIVE", "-jar", "/app.jar" ]
CMD ["./mvnw", "spring-boot:run", "-Dspring.profiles.active=$SPRING_PROFILES_ACTIVE"]