var app = new Vue({
  el: "#app",
  data: {
    columns: {
      id: "ID",
      subject: "件名",
      category: "カテゴリ",
      mad: "最大ダメージ",
      mid: "最小ダメージ",
      rpm: "RPM",
      ammo: "装填数",
    },
    tasks: [
      {
        id: 1,
        subject: "AK-12(B)",
        category: "アサルトライフル",
        mad: 24.5,
        mid: 18,
        rpm: 750,
        ammo: 31,
      },
      {
        id: 2,
        subject: "AK-12",
        category: "アサルトライフル",
        mad: 24.5,
        mid: 18,
        rpm: 650,
        ammo: 31,
      },
    ],
  },
  methods: {
    sort(key) {
      for (let i = 0; i < this.tasks.length; i++) {
        minj = i;
        for (let j = i + 1; j < this.tasks.length; j++) {
          console.log("compare", this.tasks[minj][key], this.tasks[j][key]);
          if (this.tasks[minj][key] > this.tasks[j][key]) minj = j;
        }
        const t = this.tasks[i];
        this.$set(this.tasks, i, this.tasks[minj]);
        this.$set(this.tasks, minj, t);
      }
      console.log("sorted!", this.tasks);
    },
    test(key) {
      console.log("hi", key);
    },
  },
  computed: {},
});
