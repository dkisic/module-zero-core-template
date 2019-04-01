(function ($) {

    var _userService = abp.services.app.user;
    var _$modal = $('#UserEditModal');
    var _$form = $('form[name=UserEditForm]');

    function save() {

        if (!_$form.valid()) {
            return;
        }

        var user = _$form.serializeFormToObject(); //serializeFormToObject is defined in main.js
        user.roleNames = [];
        var _$roleCheckboxes = $("input[name='role']:checked");
        if (_$roleCheckboxes) {
            for (var roleIndex = 0; roleIndex < _$roleCheckboxes.length; roleIndex++) {
                var _$roleCheckbox = $(_$roleCheckboxes[roleIndex]);
                user.roleNames.push(_$roleCheckbox.val());
            }
        }

        abp.ui.setBusy(_$form);

        //comment this and uncomment ajax call under to see behaviour when request is going through controller
        _userService.update(user).done(function (result, x, response) {
            if (response.status === 200) {
                _$modal.modal('hide');
                location.reload(true); //reload page to see edited user!
                toastr.success("Request successful");
            }
            else {
                toastr.error("Error");
            }
        }).always(function () {
            abp.ui.clearBusy(_$form);
        });
        
        /*
        $.ajax({
            url: '/Users/UpdateUser',
            data: user,
            type: 'POST',
            success: function () {
                _$modal.modal('hide');
                location.reload(true); //reload page to see edited user!
            },
            error: function () {
                toastr.error("Error");
            },
            always: function (result) {
                abp.ui.clearBusy(_$form);
            }
        });
       */
    }

    //Handle save button click
    _$form.closest('div.modal-content').find(".save-button").click(function (e) {
        e.preventDefault();
        save();
    });

    //Handle enter key
    _$form.find('input').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            save();
        }
    });

    $.AdminBSB.input.activate(_$form);

    _$modal.on('shown.bs.modal', function () {
        _$form.find('input[type=text]:first').focus();
    });
})(jQuery);