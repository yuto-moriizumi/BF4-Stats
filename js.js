class Weapon {
  constructor(tab_separeted_line) {
    const data = tab_separeted_line.split("\t");
    this.id = parseInt(data[0]);
    this.category = data[1];
    this.name = data[2];
    this.mad = parseInt(data[3]);
    this.mid = parseInt(data[4]);
    this.rpm = parseInt(data[5]);
    this.ammo = parseInt(data[6]);
    this.speed = parseInt(data[7]);
  }

  ddps = () => this.mad * this.rpm;
}

const app = new Vue({
  el: "#app",
  data: {
    columns: {
      id: "ID",
      name: "件名",
      category: "カテゴリ",
      mad: "最大ダメージ",
      mid: "最小ダメージ",
      rpm: "RPM",
      ammo: "装填数",
      speed: "弾速",
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
          if (this.tasks[minj][key] > this.tasks[j][key]) minj = j;
        }
        const t = this.tasks[i];
        this.$set(this.tasks, i, this.tasks[minj]);
        this.$set(this.tasks, minj, t);
      }
      console.log("sorted!", this.tasks);
    },
    loadTsv(tsv) {
      console.log("tsv", tsv);
      this.tasks = tsv.split("\n").map((line) => new Weapon(line));
    },
  },
  created: function () {
    const req = new XMLHttpRequest();
    req.open("GET", "./data.tsv");
    req.send(null);
    req.onloadend = () => {
      this.loadTsv(req.responseText);
    };
  },
});
