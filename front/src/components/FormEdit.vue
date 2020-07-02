<template>
    <v-container class="box">
      <v-col cols="12" sm="12" md="12">
        <h2 class="text-center">{{ this.$route.params.id ? 'Editar Funcionário' : 'Cadastrar Novo Funcionário'}}</h2>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <v-text-field
          v-model="firstName"
          color="#666"
          backgroundColor="#FFF"
          :clearable=true
          label="Primeiro Nome"
          filled >
        </v-text-field>
        <v-text-field
          v-model="lastName"
          color="#666"
          backgroundColor="#FFF"
          :clearable=true
          label="Ultimo Nome"
          filled >
        </v-text-field>
        <v-text-field
          v-model="salary"
          color="#666"
          backgroundColor="#FFF"
          :clearable=true
          label="Salário"
          prefix="R$ "
          type="number"
          filled >
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="12" md="12">
        <v-btn class="btn" @click="salvar" :loading="loading" large color="success">Salvar</v-btn>
        <v-btn @click="voltar" :loading="loading" large color="#FFF">Voltar</v-btn>
      </v-col>

      <v-snackbar :top=true v-model="snackbar.open" :color=snackbar.color>
        {{ snackbar.text }}
      </v-snackbar>
    </v-container>
</template>

<script>
export default {
  name: 'FormEdit',
  data() {
    return {
      loading: false,
      firstName: "",
      lastName: "",
      salary: 0.00,
      snackbar: {
        open: false,
        text: '',
        color: 'grey'
      },
    }
  },
  beforeCreate() {
      const id = this.$route.params.id

      if (id) {
        this.$http.get(`/employee/${id}`, {
            headers: {
                Authorization: this.$store.state.token
            }
        }).then((response) => {
                this.firstName = response.data.firstName
                this.lastName = response.data.lastName
                this.salary = response.data.salary
        }).catch(() => {
            this.$router.push({ name: 'Dashboard' }) 
        })
      }
  },
  methods: {
    voltar () {
        this.$router.push({name: 'Dashboard'})
    },
    salvar() {
        const id = this.$route.params.id

        if (id) {
            this.$http.put(`/employee/${id}`, {
                firstName: this.firstName,
                lastName: this.lastName,
                salary: this.salary
            }, {
                headers: {
                    Authorization: this.$store.state.token
                }
            }).then(() => {
                this.snackbar.text = "Funcionário salvo com sucesso"
                this.snackbar.color = 'green'
                this.snackbar.open = true
            })

            return
        }

        this.$http.post(`/employee`, {
            firstName: this.firstName,
            lastName: this.lastName,
            salary: this.salary
        }, {
            headers: {
                Authorization: this.$store.state.token
            }
        }).then(() => {
            this.snackbar.text = "Funcionário criado com sucesso"
            this.snackbar.color = 'green'
            this.snackbar.open = true
            setTimeout(() => {
                this.$router.push({name: 'Dashboard'})
            }, 2000)
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