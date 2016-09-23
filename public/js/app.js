$(function () {

  // CODE
  $('#codeForm').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: codeUrl,
      method: 'POST',
      dataType: 'json',
      data: $(this).serializeArray()
    })
    .done(function (data) {
      if (data.success) {
        window.location = redirectCodeUrl + data.hash;  
      } else {
        $('.codeError').show();
      }
    })
    .fail(function () {
      window.location = '/login';
    });   
  });

  // ANSWER
  $('.btn-choice').click(function (e) {
    e.preventDefault();
    const el = $(this);
    var answer = el.text();
    sendAnswer(answer, function (data){
      if (data.success) {
        $('#modalSuccess').openModal({
          dismissible: false,
          opacity: .5
        });
         $('#modalSuccess .btn-close').click(function () {
            window.location = redirectAnswerUrl + data.next;  
         });
      } else {
        el.addClass('red');
      }
    });
  });    

  $('#answerForm').submit(function (e) {
    e.preventDefault();
    var formDatas = $(this).serializeArray();
    sendAnswer(formDatas[1].value, function (data) {
      if (data.success) {
        $('#modalSuccess').openModal({
          dismissible: false,
          opacity: .5
        });
         $('#modalSuccess .btn-close').click(function () {
            window.location = redirectAnswerUrl + data.next;  
         });
      } else {
        $('.answerError').show();
      }
    });
  });

  function sendAnswer (answer, cb) {
    $.ajax({
      url: answerCheckUrl,
      method: 'POST',
      dataType: 'json',
      data: { answer: answer, _csrf: token }
    })
    .done(cb)
    .fail(function () {
      window.location = '/login';
    });
  }

  // CHART
  $('#chartBtn').click(function (e) {
    e.preventDefault();
    $('#modalChart').openModal();

    $.ajax({
      url: '/users',
      method: 'GET',
      dataType: 'json'
    })
    .done(function (data) {
      if (data.success) {
        var rows = '';
        for (var i = 0; i < data.teams.length; i++) {
          var myself = (data.user.name === data.teams[i].name);
          rows += [
            '<tr' + (myself ? ' class="me"' : '') + '>',
            '<td>' + data.teams[i].name + '</td>',
            '<td>' + data.teams[i].points + 'pts</td>',
            '<td>' + data.teams[i].progress + '%</td>',
            '</tr>'
          ].join();
        }
        $('#chart > tbody:last-child').html(rows);
        $('#chartProgress').hide();
      } else {
        $('.chartError').show();
      }
    });
  });  
});