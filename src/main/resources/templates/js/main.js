$(async function () {

    var $tableUsers = $('#table-users');
    var $allRoles=[];

    async function getAllRoles() {
         $.ajax({
                type: 'GET',
                url: '/rest/roles',
                dataType: 'json',
                success: function (roles) {
                    $allRoles=roles;
                },
                error: function () {
                    alert('error get all users role')
                }
            });

        };

    function addEditRole(user) {
        var block = '';
        $.each($allRoles, function (i, role) {
            block += `<p><input ${user.authorities.includes(role) ? 'checked' : ''} 
                        type="checkbox" name="edit-role"  value="${role}">${role}</input></p>`;
        });
        return block;
    };

    function addNewRole() {
        var block = '';

        $.each($allRoles, function (i, role) {
            block += `<input type="checkbox" name="new-role" value="${role}"> ${role} </input>`;
        });
        console.log(block)
        return block;
    };

    function addDeleteRole(user) {
        var block = '';
        $.each($allRoles, function (i, role) {
            block += `<p><input disabled ${user.authorities.includes(role) ? 'checked ' : ''} type="checkbox" 
                                        name="delete-role"  value="${role}">${role}</input></p>`;
        });
        return block;
    };


    function addUser(user) {
        $tableUsers.append('' + '<tr id="' + user.id + '">\n' +
            '                                        <td name="id" >' + user.id + '</td>\n' +
            '                                        <td name="username">' + user.username + '</td>\n' +
            '                                        <td name="password">' + user.password + '</td>\n' +
            '                                        <td name="role">' + user.authorities + '</td>\n' +
            '                                        <td>\n' +
            '                                            <button type="submit" class="btn btn-info" data-toggle="modal"\n' +
            '                                                    data-target="#modal-edit-' + user.id + '">Edit\n' +
            '                                            </button>\n' +
            '                                            <div class="modal fade" id="modal-edit-' + user.id + '" tabindex="-1"\n' +
            '                                                 role="dialog" aria-labelledby="modal-edit" aria-hidden="true">\n' +
            '                                                <div class="modal-dialog" role="document">\n' +
            '                                                    <div class="modal-content">\n' +
            '                                                        <div class="modal-header">\n' +
            '                                                            <h5 class="modal-title" id="modaledit">Edit User</h5>\n' +
            '                                                            <button type="button" class="close" data-dismiss="modal"\n' +
            '                                                                    aria-label="Close">\n' +
            '                                                                <span aria-hidden="true">&times;</span>\n' +
            '                                                            </button>\n' +
            '                                                        </div>\n' +
            '                                                        <div class="modal-body">\n' +
            '                                                            <form class="text-center">\n' +
            '                                                                <p><label for="edit-id-' + user.id + '">ID:</label></p>\n' +
            '                                                                <p><input disabled="disabled" id="edit-id-' + user.id + '" name="edit-id"\n' +
            '                                                                          value="' + user.id + '"></p>\n' +
            '                                                                <p><label for="edit-username-' + user.id + '">Email:</label></p>\n' +
            '                                                                <p><input id="edit-username-' + user.id + '" type="text" name="edit-username"\n' +
            '                                                                          value="' + user.username + '"></p>\n' +
            '                                                                <p><label for="edit-password-' + user.id + '">Password:</label></p>\n' +
            '                                                                <p><input id="edit-password-' + user.id + '" type="password"\n' +
            '                                                                          name="edit-password"\n' +
            '                                                                          value="' + user.password + '"></p>\n' +
            '                                                                <p><label>Role:</label></p>\n'
            + addEditRole(user) +
            '                                                                <div class="float-right">\n' +
            '                                                                    <button data-dismiss="modal"\n' +
            '                                                                            class="btn btn-secondary">Close\n' +
            '                                                                    </button>\n' +
            '                                                                    <button data-id="' + user.id + '" data-dismiss="modal" type="submit" class="edit-btn btn btn-primary edit-user">Edit\n' +
            '                                                                    </button>\n' +
            '                                                                </div>\n' +
            '                                                            </form>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </td>\n' +
            '                                        <td>\n' +
            '                                            <button type="submit" class="btn btn-danger" data-toggle="modal"\n' +
            '                                                    data-target="#modal-delete-' + user.id + '">Delete\n' +
            '                                            </button>\n' +
            '                                            <div class="modal fade" id="modal-delete-' + user.id + '" tabindex="-1"\n' +
            '                                                 role="dialog" aria-labelledby="modal-delete" aria-hidden="true">\n' +
            '                                                <div class="modal-dialog" role="document">\n' +
            '                                                    <div class="modal-content">\n' +
            '                                                        <div class="modal-header">\n' +
            '                                                            <h6 class="modal-title" id="modeldelete">Delete User</h6>\n' +
            '                                                            <button type="button" class="close" data-dismiss="modal"\n' +
            '                                                                    aria-label="Close">\n' +
            '                                                                <span aria-hidden="true">&times;</span>\n' +
            '                                                            </button>\n' +
            '                                                        </div>\n' +
            '                                                        <div class="modal-body">\n' +
            '                                                            <form class="text-center" method="post" action="/admin/del">\n' +
            '                                                                <p><label for="delete-id-' + user.id + '">ID:</label></p>\n' +
            '                                                                <p><input disabled="disabled" id="delete-id-' + user.id + '" name="id"\n' +
            '                                                                          value="' + user.id + '"></p>\n' +
            '                                                                <p><label for="delete-username">Email:</label></p>\n' +
            '                                                                <p><input disabled id="delete-username-' + user.id + '"\n' +
            '                                                                          type="text" name="username"\n' +
            '                                                                          value="' + user.username + '"></p>\n' +
            '                                                                <p><label for="delete-password-' + user.id + '">Password:</label></p>\n' +
            '                                                                <p><input disabled id="delete-password-' + user.id + '"\n' +
            '                                                                          type="password" name="password"\n' +
            '                                                                          value="' + user.password + '"></p>\n' +
            '                                                                <p><label>Role:</label></p>\n'
            + addDeleteRole(user) +
            '                                                                <div class="float-right">\n' +
            '                                                                    <button data-dismiss="modal"\n' +
            '                                                                            class="btn btn-secondary">Close\n' +
            '                                                                    </button>\n' +
            '                                                                    <button data-id="' + user.id + '" data-dismiss="modal" type="submit" class="btn btn-danger delete-user">\n' +
            '                                                                        Delete\n' +
            '                                                                    </button>\n' +
            '                                                                </div>\n' +
            '                                                            </form>\n' +
            '                                                        </div>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </td>\n' +
            '                                    </tr>');
    };

    function userInfo() {
        $.ajax({
            type: 'GET',
            url: '/rest/users/' + $('#hello-title').attr('data'),
            success: function (user) {
                $('#hello-title').append(`<p>Привет <strong>${user.username}</strong>, вы вошли как <strong>${user.authorities} </strong>.</p>`);
                $(`#user-info`).append(`<tbody>
                            <tr class="table-active">
                                <td>${user.id}</td>
                                <td>${user.username}</td>
                                <td>${user.password}</td>
                                <td>${user.authorities}</td>
                            </tr>
                            </tbody>`)
            },
            error: function () {
                alert('error get user auth')
            }
        });
    };

    function getAllUsers() {
        $.ajax({
            type: 'GET',
            url: '/rest/users',
            success: function (users) {
                $.each(users, function (i, user) {
                    addUser(user);
                });
            },
            error: function () {
                alert('error get users')
            }
        });
    };

    function newUserTable() {
        $('#new-user-table').append(`<thead><tr>
                                <td>
                                    <form style="text-align: center">
                                        <label for="new-user-username">Логин:</label>
                                        <input id="new-user-username" type="text" name="username">
                                        <label for="new-user-password">Пароль:</label>
                                        <input id="new-user-password" type="password" name="password">
                                        <label>Права:</label> 
                                         ${addNewRole()}    
                                        <p><button type="button" id="new-user-btn" class="btn btn-success"> Add new User </button></p>
                                    </form>
                                </td>
                            </tr></thead>`);
    };

    await getAllRoles();
    userInfo();
    getAllUsers();

    $('#new-user-table').on('click','#new-user-btn',  function (){

        var $username=$('#new-user-username');
        var $password=$('#new-user-password');
        var $newUserRole = [];
        $('#new-user-table input:checkbox:checked').each(function (){
            $newUserRole.push(this.value)
        });

        var user = {
            username: $username.val(),
            password: $password.val(),
            authorities: $newUserRole,
        };
        console.log(user);
        $('#new-user-tab').removeClass('show active');
        $('#new-user-link').removeClass('active');
        $('#all-users-link').addClass('active');
        $('#all-users-tab').addClass('show active');

        $.ajax({
            type: 'POST',
            url: '/rest/users',
            contentType: 'application/JSON; charset=utf-8',
            data: JSON.stringify(user),
            dataType: 'json',
            success: newUser=>{
                addUser(newUser);
            },
            error:()=>{
                alert('error save user');
            }
        });
    });

    $tableUsers.delegate('.delete-user', 'click',  function (){

        var $tr = $(this).closest('tr')

        $.ajax({
            type: 'DELETE',
            url: '/rest/users/' + $(this).attr('data-id'),
            success: function () {
                $tr.fadeOut(200, function () {
                    $(this).remove();
                });
            }
        });

    });

    $tableUsers.delegate('.edit-user', 'click', function(){

        var $tr = $(this).closest('tr');
        var $editRole = [];
        $tr.find('input[name=edit-role]:checked').each(function () {
            $editRole.push(this.value)
        });
        var user = {
            id: $tr.find('input[name=edit-id]').val(),
            username: $tr.find('input[name=edit-username]').val(),
            password: $tr.find('input[name=edit-password]').val(),
            authorities: $editRole,
        };

        $.ajax({
            type: 'PUT',
            url: '/rest/users/' + $(this).attr('data-id'),
            contentType: 'application/JSON; charset=utf-8',
            data: JSON.stringify(user),
            success: function () {
                $tr.find('td[name=username').html(user.username);
                $tr.find('td[name=password').html(user.password);
                $tr.find('td[name=role').html(String(user.authorities));
            },
            error: function () {
                alert('error edit user');
            }
        });
    });

    setTimeout(()=>newUserTable(),1500);
});