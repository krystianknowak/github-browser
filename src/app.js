// import './assets/scss/app.scss';
import { getGithubUserEvents, getGithubUserInfo } from './modules/github/service';
import formatDate from './modules/date/service';
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

            let history = '';

            getGithubUserEvents(usernameInput.val())
                .then(arr => {
                    arr.forEach(historyElem => {
                        history += `
                <div class="timeline-item">
                    <div class="timeline-content">
                        <p class="heading">${formatDate(historyElem.created_at)}</p>
                        <div class="content">
                            <span class="gh-username">
                            <div class="timeline-marker is-image is-32x32">
                                <img src="${historyElem.actor.avatar_url}"/>
                            </div>
                            <a href="https://github.com/${historyElem.actor.login}">${historyElem.actor.display_login}</a>
                            </span>
                        ${historyElem.payload.action}
                        <a href="${historyElem.payload.pull_request.html_url}">pull request</a>
                        <p class="repo-name">
                            <a href="https://github.com/${historyElem.repo.name}">${historyElem.repo.name}</a>
                        </p>
                    </div>
                    </div>
                </div>
                `;
                    });

                    $('.timeline').html(history);
                });

            getGithubUserInfo(usernameInput.val())
                .then(function(res) {
                    self.update_profile(res);
                });
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