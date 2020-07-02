<template>
  <v-container>
    <v-card class="mx-auto" max-width="70%" tile >
      <v-list>
        <v-subheader>
          <h4>Lista de funcionários</h4>
          <v-btn @click="newEmployee" class="align-right" color="primary">
            <v-icon v-text="'add'"></v-icon>
            Novo Funcionario
          </v-btn>
        </v-subheader>
        <v-list-item-group color="primary">
          <v-list-item class="item-list" v-for="employee in employees" :key="employee._id">
            <v-list-item-content @click="$router.push(`/employee/${employee._id}`)">
              <v-list-item-title v-html="employee.firstName + ' ' + employee.lastName"></v-list-item-title>
              <v-list-item-subtitle class="edit-hover">Clique para editar</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon @click.prevent="remove(employee._id)" class="box-hovered" v-text="'delete'"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-snackbar :top=true v-model="snackbar.open" :color=snackbar.color>
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    name: 'Actions',
    data() {
      return {
        employees: [],
        snackbar: {
          open: false,
          text: '',
          color: 'grey'
        },
      }
    },
    beforeCreate() {
      this.$http.get('/employees', {
        headers: {
          'Authorization': this.$store.state.token
        }
      }).then((response) => {
        this.employees = response.data
      })
    },
    methods: {
      remove(id) {
        let index = this.employees.findIndex(employee => employee._id == id)
        this.$delete(this.employees, index)
        this.$http.delete(`/employee/${id}`, {
          headers: {
            Authorization: this.$store.state.token
          }
        }).then(() => {
          this.snackbar.open = true
          this.snackbar.text = 'Funcionário deletado com sucesso'
          this.snackbar.color = 'green'
        }).catch(() => {
          this.snackbar.open = true
          this.snackbar.text = 'Erro ao deletar funcionário'
          this.snackbar.color = 'red'
        })
      },
      newEmployee() {
        this.$router.push({name: 'Editor'})
      }
    }
  }
</script>

<style scoped>
  .box-hovered {
    cursor: pointer;
  }
  
  .box-hovered:hover {
    color: red;
  }

  .edit-hover {
    display: none;
  }

  .item-list:hover .edit-hover {
    display: block;
    color: thistle;
  }

  .align-right {
    position: absolute;
    right: 13px;
  }
</style>
