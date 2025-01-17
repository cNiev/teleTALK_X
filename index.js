import { TwitterApi } from 'twitter-api-v2';

// Validar variables de entorno (ya lo tenías)
if (!process.env.TWITTER_API_KEY) throw new Error('Falta TWITTER_API_KEY');
if (!process.env.TWITTER_API_SECRET) throw new Error('Falta TWITTER_API_SECRET');
if (!process.env.TWITTER_ACCESS_TOKEN) throw new Error('Falta TWITTER_ACCESS_TOKEN');
if (!process.env.TWITTER_ACCESS_TOKEN_SECRET) throw new Error('Falta TWITTER_ACCESS_TOKEN_SECRET');

// Crear la instancia
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

(async () => {
  try {
    // Calcular la marca de tiempo de "hace 24 horas"
    const now = new Date();
    const yesterdayISO = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

    // Realizar la búsqueda
    const query = '#arte -is:retweet';
    const response = await twitterClient.v2.search(query, {
      start_time: yesterdayISO,
      // max_results depende de tus necesidades y del nivel de acceso a la API
      max_results: 50,
    });

    // Dependiendo de tu nivel de acceso, la API puede devolverte:
    //  - response.meta.result_count (número total de tweets)
    //  - response.data (lista de tweets) en response.data.data
    let totalUsos = 0;
    if (response.meta && typeof response.meta.result_count === 'number') {
      totalUsos = response.meta.result_count;
    }

    // Prepara el texto del tweet (manteniendo tu texto base y agregando la cifra)
    const tweetText = `En las últimas 24 horas se ha utilizado #arte ${totalUsos} veces. ¡Que siga la creatividad!`;

    // Tuitear
    const tweet = await twitterClient.v2.tweet(tweetText);
    console.log('Tweet publicado con éxito:', tweet);
  } catch (error) {
    // Ejemplo de manejo de rate limit (código 429)
    if (error.data && error.data.status === 429) {
      console.error('Rate limit alcanzado. Intenta más tarde.', error);
    } else {
      console.error('Error al publicar el tweet', error);
    }
  }
})();
