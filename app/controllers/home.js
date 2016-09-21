
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  if (req.user.currentStep !== 0) {
    const lastQuestion = req.user.questions[req.user.currentStep - 1];

    if (lastQuestion.done) {
      res.redirect('/etape/' + req.user.currentStep);
    } else {
      res.redirect('/question/' + lastQuestion.id);
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
