import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#9652ff',
        success: '#3cd1c2',
        info: '#ffaa2c',
        error: '#f83e70',
        background: '#f0f0f0',
      },
    },
  },
})
