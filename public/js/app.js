$(function() {

  // CODE
  $( "#codeForm" ).submit(function( e ) {
    e.preventDefault();
    $.ajax({
      url: codeUrl,
      method: 'POST',
      dataType: 'json',
      data: $(this).serializeArray()
    })
    .done(function( data ) {
      if (data.success) {
        window.location = redirectCodeUrl + data.hash;  
      } else {
        $('.codeError').show();
      }
    });
  });

  // ANSWER
  $( ".btn-choice" ).click(function( e ) {
    e.preventDefault();
    const el = $(this);
    var answer = el.text();
    sendAnswer(answer, function (data){
      if (data.success) {
        window.location = redirectAnswerUrl + data.next;  
      } else {
        el.addClass('red');
      }
    });
  });    

  $( "#answerForm" ).submit(function( e ) {
    e.preventDefault();
    var formDatas = $(this).serializeArray();
    sendAnswer(formDatas[1].value, function (data) {
      if (data.success) {
        window.location = redirectAnswerUrl + data.next;  
      } else {
        $('.answerError').show();
      }
    });
  });

  function sendAnswer(answer, cb) {
    $.ajax({
      url: answerCheckUrl,
      method: 'POST',
      dataType: 'json',
      data: { answer: answer, _csrf: token }
    })
    .done(cb);     
  }

  // CHART
  $( "#chartBtn" ).click(function( e ) {
    e.preventDefault();
    $('#modalChart').openModal();

    $.ajax({
      url: '/users',
      method: 'GET',
      dataType: 'json'
    })
    .done(function( data ) {
      if (data.success) {
        data.teams.forEach(function (team) {
          var row = [
            '<tr>',
            '<td>' + team.name + '</td>',
            '<td>' + team.points + 'pts</td>',
            '<td>' + team.progress + '%</td>',
            '</tr>'
          ].join();
          $('chart > tbody:last-child').append(row);
        });
        $('#chartProgress').hide();
      } else {
        $('.chartError').show();
      }
    });
  });  
});