import './assets/scss/app.scss';
import $ from 'cash-dom';


export class App {
    initializeApp() {
        let self = this;

        $('.username').on('input focusout', function() {
            const usernameInput = $(this);
            self.valid_Input(usernameInput);
        });

        $('.load-username').on('click', function(e) {
            const usernameInput = $('.username');
            const username = usernameInput.val();
            if (!self.valid_Input(usernameInput)) return;

            fetch('https://api.github.com/users/' + username)
                .then((response) => response.json())
                .then(function(response) {
                    //self.profile = body;
                    self.update_profile(response);
                })

        });
    }

    valid_Input(usernameInput) {
        const reg = /^[a-z0-9\-_]+$/;
        const is_correct = reg.test(usernameInput.val());

        if (is_correct) {
            usernameInput.removeClass("invalid");
            return true;
        } else {
            usernameInput.addClass("invalid");
            return false;
        }
    }

    update_profile(newProfile) {
        $('#profile-name').text($('.username.input').val());
        $('#profile-image').attr('src', newProfile.avatar_url);
        $('#profile-url').attr('href', newProfile.html_url).text(newProfile.login);
        $('#profile-bio').text(newProfile.bio || '(no information)');
    }
}