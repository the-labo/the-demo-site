/**
 * Template contents
 * @namespace Templates
 * @property {string} en/goodby.mail - Template from en/goodby.mail.hbs
 * @property {string} en/recover.mail - Template from en/recover.mail.hbs
 * @property {string} en/verify.mail - Template from en/verify.mail.hbs
 * @property {string} ja/goodby.mail - Template from ja/goodby.mail.hbs
 * @property {string} ja/recover.mail - Template from ja/recover.mail.hbs
 * @property {string} ja/verify.mail - Template from ja/verify.mail.hbs
 */
'use strict'

const { compile } = require('handlebars')
const Templates = {}

// From en/goodby.mail.hbs
Templates['en/goodby.mail'] = compile(`{{! Good-bye mail }}
{{#if name}}Dear {{name}},{{/if}}

Your withdrawal request has been processed.

We hope to be of help to you again.
Thank you for using us.

{{{by}}}`)

// From en/recover.mail.hbs
Templates['en/recover.mail'] = compile(`{{! Password reset mail }}
Hi {{#if name}}{{name}}{{else}}there{{/if}},

We received a request to reset the password for your account ({{key}}).
Please click on the following link, or paste this into your browser to complete the process:

<a href='{{{url}}}'>{{{url}}}</a>

The request will expire at {{expireAt}}.

If you don't want to reset your password, please ignore this message.
Your password will not be reset.

{{{by}}}`)

// From en/verify.mail.hbs
Templates['en/verify.mail'] = compile(`{{! Email address verify }}
Hey, we want to verify that you are indeed "{{key}}".
If that's the case, please follow the link below:

<a href="{{{url}}}">{{{url}}}</a>

If you're not {{key}} or didn't request verification you can ignore this email.

{{{by}}}
`)

// From ja/goodby.mail.hbs
Templates['ja/goodby.mail'] = compile(`{{! Good-bye mail }}
{{#if name}}{{name}}様{{/if}}

退会処理が完了いたしました。

是非またのご利用をお待ちしております。
ご利用頂きまして、誠にありがとうございました。

{{{by}}}
`)

// From ja/recover.mail.hbs
Templates['ja/recover.mail'] = compile(`{{! Password reset mail }}
こんにちは  {{#if name}}{{name}}さん{{/if}}

アカウント{{key}}に対するパスワード初期化のリクエストを受理しました。

以下のリンクをクリックして、新しいパスワードを入力してください。

<a href='{{{url}}}'>{{{url}}}</a>

このリンクの有効期限は{{expireAt}}です。

初期化を中止したい場合は、このメッセージを無視してください。
パスワードは元のまま変更されません。

{{{by}}}`)

// From ja/verify.mail.hbs
Templates['ja/verify.mail'] = compile(`{{! Email address verify }}
あなたが"{{key}}"であることの確認です。
下記のリンクをクリックしてください。

<a href="{{{url}}}">{{{url}}}</a>

もしあなたが{{key}}ではない場合や、このメールに心当たりがない場合は無視してください。

{{{by}}}
`)

module.exports = Templates
