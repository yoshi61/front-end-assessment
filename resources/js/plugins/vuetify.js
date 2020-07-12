import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '../../css/app.css';
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify)

// set custom options (colors and icons)
export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#e5e5e5',
                primaryLight: '#f1f1f1',
                accent: '#4fbebf',
                error: colors.red.base,
                errorLight: colors.red.lighten2,
                info: colors.lightBlue.base,
                secondary: '#fff',
                success: colors.lightGreen.base,
                warning: colors.amber.base,
                inner: colors.grey.lighten2,
            },
            dark: {
                primary: colors.green.base,
                primaryLight: colors.green.lighten2,
                accent: colors.purple.base,
                error: colors.red.base,
                errorLight: colors.red.lighten2,
                info: colors.lightBlue.base,
                secondary: colors.indigo.base,
                success: colors.lightGreen.base,
                warning: colors.amber.base,
                inner: colors.grey.lighten2,
            }
        },
    },
    // icons: {
    //     iconfont: 'mdi',  // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    //     values: {
    //         // font-awesome
    //         // 'font-awesome' : 'fas fa-copyright',
    //
    //         // material-icons
    //         // 'copyright' : 'pin_drop',
    //
    //         /** USAGE //////////////////////////////////////////////////////////////////
    //
    //          <v-icon v-text="'$vuetify.icons.font-awesome'"></v-icon>
    //          <v-icon>$vuetify.icons.copyright</v-icon>
    //          <v-icon>copyright</v-icon>
    //
    //          */
    //     },
    // }
})
