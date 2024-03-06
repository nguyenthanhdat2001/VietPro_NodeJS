class TestController {

  test1(req, res) {
    req.session.name = "Dat"
    delete req.session.name
    console.log(req.session.name);
  }

  test2(req, res) {
    if(req.session.name){
      res.send('Success')
    }else{
      res.send('Fail')
    }
  }
}

module.exports = new TestController();
