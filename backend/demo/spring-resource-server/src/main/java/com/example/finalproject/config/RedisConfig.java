//package com.example.finalproject.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.redis.cache.RedisCacheConfiguration;
//import org.springframework.data.redis.cache.RedisCacheManager;
//import org.springframework.data.redis.connection.RedisClusterConfiguration;
//import org.springframework.data.redis.connection.RedisConnectionFactory;
//import org.springframework.data.redis.connection.RedisSentinelConfiguration;
//import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
//import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
//import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
//import org.springframework.data.redis.serializer.RedisSerializationContext;
//import org.springframework.data.redis.serializer.RedisSerializer;
//import org.springframework.data.redis.serializer.StringRedisSerializer;
//
//import java.time.Duration;
//import java.util.Arrays;
//import java.util.List;
//
//
//@Configuration
//@EnableCaching
//public class RedisConfig {
//  @Value("${spring.data.redis.sentinel.master}")
//  private String sentinelMaster;
//  @Value("${spring.data.redis.sentinel.nodes}")
//  private String sentinelNodes;
//
//  @Bean
//  RedisConnectionFactory jedisConnectionFactory() {
//    RedisSentinelConfiguration sentinelConfig = new RedisSentinelConfiguration()
//            .master(sentinelMaster)
//            .sentinel("127.0.0.1", 26379) .sentinel("127.0.0.1", 26380);
//    return new JedisConnectionFactory(sentinelConfig);
////    JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory();
//
////    jedisConnectionFactory.master(sentinelMaster);
////    List<String> nodes = Arrays.asList(sentinelNodes.split(","));
////    for (String node : sentinelNodes.split(",")) {
////      String[] split = node.split(":");
////      sentinelConfig.sentinel(split[0], Integer.parseInt(split[1]));
////    }
//
////    return new JedisConnectionFactory(new RedisClusterConfiguration(nodes));
//  }
//
//  // Setting up the Redis template object.
//  @Bean
//  public RedisTemplate<String,Object> redisTemplate(){
//    RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();
//    redisTemplate.setConnectionFactory(jedisConnectionFactory());
//    redisTemplate.setExposeConnection(true);
//    redisTemplate.setKeySerializer(new StringRedisSerializer());
//    redisTemplate.setHashKeySerializer(new JdkSerializationRedisSerializer());
//    redisTemplate.setValueSerializer(new JdkSerializationRedisSerializer());
//    redisTemplate.setEnableTransactionSupport(true);
//    redisTemplate.afterPropertiesSet();
//    return redisTemplate;
//
//  }
//
//  @Bean
//  public RedisCacheManager cacheManager() {
//    RedisCacheConfiguration cacheConfig = RedisCacheConfiguration.defaultCacheConfig()
//            .disableCachingNullValues()
//            .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
//            .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(RedisSerializer.java()))
//            .entryTtl(Duration.ofMinutes(5));
//    return RedisCacheManager.builder(jedisConnectionFactory())
//            .cacheDefaults(cacheConfig)
//            .build();
//  }
//
//}
