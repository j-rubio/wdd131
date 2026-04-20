import questions from './questions.mjs'

function recipeTemplate(question, isFirst = false) {
  return `
    <details>
      <summary>
        Question ${questions.id}.<br /><br />
        ${questions.question}
        What is the difference between written and oral law?
      </summary>
      <p>
        ${questions.answer}
        <b>The Written Law</b><em>(Torah Shebichtav)</em> refers to the Five
        Books of Moses given in written form at Sinai.<br />
        <b>The Oral Law</b><em>(Torah Shebe'al Peh)</em> includes the
        interpretations and details given to Moses at Sinai (later recorded in
        the <em>Mishnah</em> and <em>Talmud</em>,and later rabbinic rulings)
        that explain how to fulfill the Written Law's commandments.
        <br />Without the Oral Law, many of the mitzvot could not be observed
        properly.
      </p>
    </details>`
}
