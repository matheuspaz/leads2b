<template>
    <v-container class="box">
      <v-col cols="12" sm="12" md="12">
        <h2 class="text-center">Logar no sistema de gestão</h2>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          v-model="email"
          color="#666"
          backgroundColor="#FFF"
          :clearable=true
          label="E-mail"
          type="email"
          filled >
        </v-text-field>
        <v-text-field
          v-model="password"
          color="#666"
          backgroundColor="#FFF"
          :clearable=true
          label="Senha"
          type="password"
          filled >
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <v-btn @click="login" :loading="loading" class="btn" large color="success">Logar</v-btn>
        <v-btn @click="register" :loading="loading" large color="#FFF">Cadastrar</v-btn>
      </v-col>  

      <v-snackbar :top=true v-model="snackbar.open" :color=snackbar.color>
        {{ snackbar.text }}
      </v-snackbar>
    </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      email: "",
      password: "",
      snackbar: {
        open: false,
        text: '',
        color: 'grey'
      },
    }
  },
  methods: {
    login() {
      this.loading = true
      if (this.email == "" || this.email == undefined || this.password == undefined || this.password == "") {
        this.snackbar.text = "Erro ao efetuar login"
        this.snackbar.color = 'red'
        this.snackbar.open = true
        this.loading = false
        return
      }
      this.$http.post('/login', {
        email: this.email,
        password: this.password
      }).then((response) => {
        if (response.data.token) {
          this.snackbar.text = "Login efetuado com sucesso! Você será redirecionado em breve...."
          this.snackbar.color = 'green'
          this.$store.commit('storeToken', response.data.token)
        }

        if (! response.data.token) {
          this.snackbar.text = "Erro ao efetuar login"
          this.snackbar.color = 'red'
        }

        this.snackbar.open = true
        this.loading = false
        setTimeout(() => {
          this.$router.push({name: 'Dashboard'})
        }, 2000)
      }).catch((error) => {
        this.snackbar.open = true
        this.snackbar.text = error.response.data.message
        this.snackbar.color = 'red'
        this.loading = false  
      })
    },
    register() {
      if (this.email == "" || this.email == undefined || this.password == undefined || this.password == "") {
        this.snackbar.text = "Erro ao efetuar cadastro"
        this.snackbar.color = 'red'
        this.snackbar.open = true
        this.loading = false
        return
      }
      this.$http.post('/register', {
        email: this.email,
        password: this.password
      }).then((response) => {
        if (response.data.token) {
          this.snackbar.text = "Cadastro efetuado com sucesso! Você será redirecionado em breve...."
          this.snackbar.color = 'green'
          this.$store.commit('storeToken', response.data.token)
        }

        if (! response.data.token) {
          this.snackbar.text = "Erro ao efetuar cadastro"
          this.snackbar.color = 'red'
        }

        this.snackbar.open = true
        this.loading = false
        setTimeout(() => {
          this.$router.push({name: 'Dashboard'})
        }, 2000)
      }).catch((error) => {
        this.snackbar.open = true
        this.snackbar.text = error.response.data.message
        this.snackbar.color = 'red'
        this.loading = false  
      })
    }
  },
}
</script>

<style scoped>
  .box {
    width: 40%;
    background-color: indigo;
    margin: 10% auto;
    color: white;
    border-radius: 4px;
  }

  .btn {
    margin-right: 10px;
  }
</style>