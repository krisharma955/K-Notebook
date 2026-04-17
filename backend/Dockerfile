# Stage 1: Build the application
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy the Maven wrapper properties and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Give execute permission to the wrapper
RUN chmod +x mvnw

# Download dependencies (this caches them in this image layer)
RUN ./mvnw dependency:go-offline

# Copy the actual source code and build the .jar
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the minimal production image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy only the compiled .jar file from the 'build' stage
COPY --from=build /app/target/*.jar app.jar

# Expose the internal port Spring Boot uses
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
