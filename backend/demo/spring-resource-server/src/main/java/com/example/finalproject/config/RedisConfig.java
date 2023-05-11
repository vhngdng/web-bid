//package com.example.finalproject.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.cache.RedisCacheConfiguration;
//import org.springframework.data.redis.cache.RedisCacheManager;
//import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
//import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
//import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.RedisSerializationContext;
//import org.springframework.data.redis.serializer.RedisSerializer;
//import org.springframework.data.redis.serializer.StringRedisSerializer;
//
//import java.time.Duration;
//
//import static io.lettuce.core.ReadFrom.REPLICA_PREFERRED;
//
//@Configuration
//@EnableCaching
//public class RedisConfig {
//  @Value("${spring.data.redis.host}")
//  private String host;
//  @Value("${spring.data.redis.port}")
//  private Integer port;
//  @Bean
//  public LettuceConnectionFactory redisConnectionFactory() {
//    LettuceClientConfiguration clientConfig = LettuceClientConfiguration.builder()
//            .readFrom(REPLICA_PREFERRED)
//            .build();
//    RedisStandaloneConfiguration serverConfig = new RedisStandaloneConfiguration(host, port);
//    return new LettuceConnectionFactory(serverConfig, clientConfig);
//  }
//
//
//  @Bean
//  public RedisCacheManager cacheManager() {
//    RedisCacheConfiguration cacheConfig = RedisCacheConfiguration.defaultCacheConfig()
//            .disableCachingNullValues()
//            .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
//            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(RedisSerializer.java()))
//            .entryTtl(Duration.ofMinutes(5));
//    return RedisCacheManager.builder(redisConnectionFactory())
//            .cacheDefaults(cacheConfig)
//            .build();
//  }
//}
