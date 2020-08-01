<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">exert-nuxt</h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >GitHub</a>
      </div>
    </div>
    <div v-for="t in testers" :key="t.id">
      <span>{{t.id}}</span>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    // let result = await context.$db.execute(
    //   "SELECT * FROM `t_id` WHERE `id` < ?",
    //   [100]
    // );
    let result = await context.$db.transact().then((db) => {
      return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
          if (err) {
            reject(err);
          } else {
            db.execute(
              "SELECT * FROM `t_id` WHERE `id` < ?",
              [100],
              (err, data, fields) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({
                    data: data.map((i) => {
                      return { ...i };
                    }),
                    fields,
                  });
                }
              }
            );
          }
        });
      });
    });
    return {
      testers: result.data,
    };
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
