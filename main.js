var MicroCode = (function() {
	return {
		init: function(inputSel, outputSel, languageSel) {
			this.focusInput(inputSel);
			this.listenForInput(inputSel);
			this.listenForLanguage(languageSel, outputSel, inputSel);
			this.renderOutput(outputSel, document.querySelector(inputSel).value);
			this.listenForScroll(inputSel, outputSel);
		},

		listenForInput: function(inputSel) {
			var self = this;

			document.querySelector(inputSel).addEventListener('input', function() {
				self.renderOutput('.code-output', this.value);
			});
		},

		listenForLanguage: function(languageSel, outputSel, inputSel) {
			var self = this;
			document.querySelector(languageSel).addEventListener('change', function() {
				var selectedLang = this.value;

				document.querySelector(outputSel + ' code').className = 'language-' + selectedLang;
				document.querySelector(inputSel).value = '';
				document.querySelector(outputSel + ' code').innerHTML = '';

				self.focusInput(inputSel);
			});
		},

		listenForScroll: function(inputSel, outputSel) {
			document.querySelector(inputSel).addEventListener('scroll', function() {
				document.querySelector(outputSel).scrollTop = this.scrollTop;
			});
		},

		renderOutput: function(outputSel, value) {
			const language = document.querySelector('.language').value;
			document.querySelector(outputSel + ' code').innerHTML = Prism.highlight(value, Prism.languages[language], language);
		},

		focusInput: function(inputSel) {
			var input = document.querySelector(inputSel);
			input.focus();
			input.selectionStart = input.value.length;
			input.selectionEnd = input.value.length;
		}
	};
})();

MicroCode.init('.code-input', '.code-output', '.language');
