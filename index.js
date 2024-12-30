import { TwitterApi } from 'twitter-api-v2';

// Verificar las variables (por si alguna falta)
if (!process.env.TWITTER_API_KEY) throw new Error('Falta TWITTER_API_KEY');
if (!process.env.TWITTER_API_SECRET) throw new Error('Falta TWITTER_API_SECRET');
if (!process.env.TWITTER_ACCESS_TOKEN) throw new Error('Falta TWITTER_ACCESS_TOKEN');
if (!process.env.TWITTER_ACCESS_TOKEN_SECRET) throw new Error('Falta TWITTER_ACCESS_TOKEN_SECRET');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

(async () => {
  try {
    // Llamar la API v2 para postear un tweet
    const tweet = await twitterClient.v2.tweet('¡Hola, este es un tweet desde cero con OAuth 1.0a y la API v2!');
    console.log('Tweet publicado con éxito:', tweet);
  } catch (error) {
    console.error('Error al publicar el tweet:', error);
  }
})();
