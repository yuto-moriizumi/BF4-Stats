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

  get mdps() {
    return Math.round((this.mad * this.rpm) / 60);
  }
}

let currentSort = "id";
let asc = true;

const app = new Vue({
  el: "#app",
  data: {
    columns: {
      id: "ID ▲",
      name: "件名",
      category: "カテゴリ",
      mad: "最大ダメージ",
      mid: "最小ダメージ",
      rpm: "RPM",
      ammo: "装填数",
      speed: "弾速",
      mdps: "最大DPS",
    },
    tasks: [],
  },
  methods: {
    sort(key) {
      //カラム名についている▲マークを取る
      this.columns[currentSort] = this.columns[currentSort].slice(0, -2);
      if (currentSort == key) asc = !asc;
      //もし既にソートしているカラムを選択したら、昇順と降順を入れ替える
      else asc = true; //そうでない場合は昇順
      this.columns[key] += asc ? " ▲" : " ▼"; //アイコンを付ける
      currentSort = key;

      //選択ソート
      for (let i = 0; i < this.tasks.length; i++) {
        minj = i;
        for (let j = i + 1; j < this.tasks.length; j++) {
          if (
            (asc && this.tasks[minj][key] > this.tasks[j][key]) ||
            (!asc && this.tasks[minj][key] < this.tasks[j][key])
          )
            minj = j;
        }
        const t = this.tasks[i];
        this.$set(this.tasks, i, this.tasks[minj]); //オブジェクトを操作するときは$setを使う必要がある
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
