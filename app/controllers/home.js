
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  if(req.user.currentStep !== 0) {
    const curQuestion = req.user.questions[req.user.currentStep]
    if (!curQuestion) {
      res.redirect('/end');
    } else if (curQuestion.done) {
      res.redirect('/etape/' + (req.user.currentStep));
    } else {
      res.redirect('/question/' + (curQuestion.id));
    }
  } else {
    res.render('home/index', {
      title: 'Bienvenue',
      user: req.user      
    });   
   }
};

exports.qr = function (req, res) {
  res.render('home/qr', {
    title: 'QR?'
  });
};

exports.end = function (req, res) {
  res.render('home/end', {
    title: 'This this the end'
  });
};
