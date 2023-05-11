import { parse } from 'svg-parser';
const async = require('async');


async function fetchPage(i){
  return new Promise(function(resolve, reject) {
    fetch(`https://stampchain.io/api/stamps?page=${i}&page_size=500&sort_order=desc`)
      .then(response => response.json())
      .then(result => {
          resolve(result)
      })
      .catch(error => {
        reject(error)
      });

  });




}
async function fetchStamp(url){

  var fileType = url.split('.')
  //
  var isSvg = fileType[fileType.length-1];
  if(isSvg != 'svg'){
    return;
  }
  return new Promise(function(resolve, reject) {
      fetch(url)
        .then(response => response.text())
        .then(result => {

          if(result){
            var pre = parse(result).children[0].children[0].children[0].children[0].children[0].value;
            resolve({svg:result, pre:JSON.parse(pre)})
          }

        })
        .catch(error => reject(error));



  });

}


export default {
    getPages2: async function (){

      //create Tasks
      var array = []
      var attemps = [1,2];
      for (const index of attemps) {
        array.push(
          function(callback) {
            setTimeout(async function() {
              var test = await fetchPage(index);
              callback(null, test);
            }, index * 100);
          }
        )

      }
      //
      var result = [];

      function createRequestList(){
        return new Promise(function(resolve, reject) {
          //
          async.parallel(array,
            async function(err, results) {
              if(!results){reject()}
              var filtered = results.filter(function (el) {
                 return el != null;
              });
              resolve(filtered)
            });
        });
      }
      var listStamps = await createRequestList();
      //
      var concatList = []
      for (var variable of listStamps) {
        concatList = [...concatList,...variable]
      }
      //filter if > Kevin
      return concatList.filter(asset => {return asset.stamp >= 18528})
    },
    getPages: async function() {

      var datas = []
      //
      //for (var i = 1; i < 5; i++) {
      const kevinDeploy = 18528
      let n = true;
      let i = 1
      while (n == true) {
        //console.log('Fetch page =>', i);
        var temp = await fetchPage(i)
        //
        var final = []
        temp.forEach((item, i) => {
          if(item.stamp >= kevinDeploy){
            final.push(item);
          }
        });
        if(final.length == 0){
          //console.log('exit no src-20 =>', final.length);
          n = false
          break;
        } else {
          n = true
          i++;
          //console.log('find =>', final.length);
        }
        datas.push(...final);
      }
      return datas
    },
    calcProgress: function(data){

      var final = []
      for (var i = 0; i < data.length; i++) {
        var progress = (data[i].total * 100) / data[i].max
        final.push({
          id: i+1,
          svg: data[i].svg,
          stamp: data[i].index,
          tick: data[i].originalTick,
          max: data[i].max,
          lim: data[i].lim,
          mint: data[i].len,
          //attemptDeploy: data[i].attemptDeploy,
          total: data[i].total,
          progress: parseFloat(progress.toFixed(2)),
          creatorList: data[i].creatorList
        })

      }
      return final;
    },
    calcUniqueCreator: function(final){
      for (var src of final) {
        let unique = [...new Set(src.creatorList)];
        src.creatorCount = unique.length
        delete src.creatorList;
      }
      return final;
    },
    //
    getData: async function() {

      //#1 extract stamp > deploy Kevin
      var datas = await this.getPages2();
      datas.reverse();

      //#2
      var table = [];
      for (var i = 0; i < datas.length; i++) {
      //for (var i = 0; i < 10; i++) {
        //
        var stamp = await fetchStamp(datas[i].stamp_url);

        if(stamp){
          var image = stamp.pre;
          //console.log('image => i',i);
          if(image && image.p == 'src-20'){
            var minified = image.tick.toLowerCase();
            //
            var obj = {
              creator: datas[i].creator,
              index: datas[i].stamp,
              svg: stamp.svg,
              originalTick: image.tick,
              tick: minified,
              mint: [],
              max: parseInt(image.max),
              lim: parseInt(image.lim),
              total: 0,
              len: 0,
              attemptDeploy:0,
              creatorList: [],
            }
            if(image.op == 'deploy'){
              //find if token tick allready exist
              var findIndex = table.findIndex(e => e.tick == minified);
              if(findIndex == -1){
                table.push(obj);
              } else {
                table[findIndex].attemptDeploy++;
                //console.log('> token Allready deploy', obj.tick, obj.originalTick);
              }
            }
            if(image.op == 'mint'){
              var findIndex = table.findIndex(e => e.tick == minified);
              if(findIndex != -1){
                //
                var amount = parseInt(image.amt);
                var lim = table[findIndex].lim;
                if(amount > lim){
                  //console.log('> max Authorized');
                  amount = lim
                }
                //
                table[findIndex].total = table[findIndex].total + parseInt(amount)
                table[findIndex].len++
                table[findIndex].creatorList.push(obj.creator)
                table[findIndex].mint.push(image)
              }

            }
          }
        }
      }

      //#3
      var final = this.calcProgress(table)
      var final2 = this.calcUniqueCreator(final)
      //
      return final2
    },


}
