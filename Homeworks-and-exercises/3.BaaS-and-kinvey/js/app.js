/**
 * Created by PC on 06.03.2016 г..
 */
"use strict";
var app = app || {},
    userRequester,
    countryRequester,
    townRequester;

app.requester.config('kid_WysdbITbJW', '5f948783e3c84e25885d32789e168d5e');

userRequester = new app.userRequester();
countryRequester = new app.collectionRequester('Country');
townRequester = new app.collectionRequester('Town');

userRequester.login('rosen', '1234').then(
    function(success) {
        return countryRequester.getAll();
    })
    .then(function(success) {
        var ul = $('#countries'),
            countries = [];
        success.forEach(function(country) {
            var li = $('<li>').text(country.name).appendTo(ul),
                form = $('<form>').appendTo(li),
                editButton = $('<button>' + 'Edit' + '</button>')
                    .attr('id', 'edit-' + country.name)
                    .attr('class', country._id)
                    .css('margin-bottom', '8px')
                    .appendTo(form),
                deleteButton = $('<button>' + 'Delete' + '</button>')
                    .attr('id', 'delete-' + country.name)
                    .attr('class', country._id)
                    .css('margin-bottom', '8px')
                    .appendTo(form);

            countries.push(country.name);

            li.on('click', function() {
                var div = $('<div>').attr('id', 'towns-list').appendTo($('#wrapper')),
                    h4 = $('<h4>').text('Towns in ' + country.name + ':').appendTo(div),
                    townsUl = $('<ul>').attr('id', 'towns').appendTo(div),
                    label = $('<label>').text('Input new town: ').appendTo(div),
                    townAddInput = $('<input>').attr('id', 'add-town').attr('placeholder', 'Add new town...').appendTo(div),
                    townAddButton = $('<button>' + 'Add town' + '</button>').appendTo(div),
                    towns = [],
                    townForm,
                    townli,
                    townEditButton,
                    townDeleteButton;



                    townRequester.getAll().then(function(success) {
                        success.forEach(function(town) {
                            towns.push(town.name);
                            if (town.country._id === country._id) {
                                townli = $('<li>').text(town.name).appendTo(townsUl);
                                townForm = $('<form>').appendTo(townli);
                                townEditButton = $('<button>' + 'Edit' + '</button>').appendTo(townForm);
                                townDeleteButton = $('<button>' + 'Delete' + '</button>').appendTo(townForm);

                                townEditButton.on('click', function() {
                                    var townName = prompt('Enter new town name:');
                                    townRequester.editItem(town._id, townName, country._id);
                                });

                                townDeleteButton.on('click', function() {
                                    townRequester.deleteItem(town._id);
                                })
                            }
                        });

                        townAddButton.on('click', function() {
                            var newTownName = townAddInput.val();
                            townRequester.addItem(newTownName, null, towns, country._id).then(
                                function(success) {
                                    location.reload();
                                },
                                function(error){
                                    $('<div>').text(error).css('color', 'red').appendTo(townForm);
                                });

                        });
                    }).done();

            });

            editButton.on('click', function() {
                var countryName = prompt('Enter new country name:');
                countryRequester.editItem(country._id, countryName);
            });

            deleteButton.on('click', function() {
                countryRequester.deleteItem(country._id);
            });
        });

        return countries;
    })
    .then(function(countries) {
            $('#add-country-btn').on('click', function() {
                var country = $('#add-country').val();
                countryRequester.addItem(country, countries).then(
                    function(success){
                        location.reload();
                    },
                    function(error){
                        $('<div>').text(error).css('color', 'red').appendTo($('label'));
                    });
            });
        }).done();

