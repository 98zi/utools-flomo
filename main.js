var app = new Vue({
  el: '#app',
  data: {
    active: false,
    setting: false,
    textarea: '',
    api: ''
  },
  methods: {
    save() {
      localStorage.setItem('flomoapi', this.api);
      this.active = false;
      const noti = this.$vs.notification({
        position: 'top-right',
        title: `👉 保存成功！`
      })
    },
    clear(){
      localStorage.clear();
      this.api = '';
      this.active = false;
      const noti = this.$vs.notification({
        position: 'top-right',
        title: `👉 注销成功！`
      })
    },
    send() {
      const flomoapi = localStorage.getItem('flomoapi');
      if (this.textarea == '') {
        const noti = this.$vs.notification({
          position: 'top-right',
          title: `👉 请输入正确内容！`
        });
        return false;
      }
      axios
        .post(flomoapi, {
          "content": this.textarea,
        })
        .then((response) => {
          this.textarea = '';
          const noti = this.$vs.notification({
            position: 'top-right',
            title: `👉 记录成功！`
          });
        })
        .catch((error) => {
          console.error(error);
          const noti = this.$vs.notification({
            position: 'top-right',
            title: `👉 记录失败，请检查配置！`
          });
        });
    }
  },
  mounted() {
    utools.setExpendHeight(370)

    const flomoapi = localStorage.getItem('flomoapi');
    if (flomoapi && flomoapi != '') {
      this.api = flomoapi;
    } else {
      const noti = this.$vs.notification({
        position: 'top-right',
        title: `👉 请先输入api，点击右下角！`
      })
    }
  },
})