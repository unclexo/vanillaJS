/**
 * Constructor method
 *
 * Initializes some necessary attributes
 * 
 * @param string expresstion Represents DOM id element
 * @param string currentNumber Represents DOM id element
 */
function Calculator(expression, currentNumber) {
  this._operator = ''
  this._isOperatorSet = false
  this._isEqualPressed = false
  this._lastCalculatedNumber = null
  this._allowdOperators = ['+', '-', '*', '/', '.']
  this._expression = document.getElementById(expression)
  this._currentNumber = document.getElementById(currentNumber)
}

Calculator.prototype.add = function (x, y) {
  return x + y
}

Calculator.prototype.subtract = function (x, y) {
  return x - y
}

Calculator.prototype.multiply = function (x, y) {
  return x * y
}

Calculator.prototype.divide = function (x, y) {
  if (y === '0') {
    alert('Can not divide by zero')
    return
  }

  return x / y
}

Calculator.prototype.setNumber = function (event) {
  // Epmties current number
  const oneOfThese = this._isEqualPressed === true ||
    this._isOperatorSet === true ||
    this._currentNumber.innerHTML === '0'

  if (oneOfThese) {
    this._setCurrentNumber('')
    this._isOperatorSet = false
  }

  // Sets current number and expression
  const number = event.target ? event.target : event.srcElement
  this._setCurrentNumber(this._currentNumber.innerHTML + number.innerHTML)
  this._setExpression(this._expression.innerHTML + number.innerHTML)
}

Calculator.prototype.setOperator = function (operator) {
  if (operator === '=') {
    // Raises alert for invalid expression
    if (this._isExpressionInvalid()) {
      alert('Malformed expression')
      return
    }

    // Ensures equal operator pressed
    this._isEqualPressed = true

    // Calculates and empties expression
    this._calculate()
    this._setExpression('')

    return
  }

  // Calcuates current expression
  if (!this._isEqualPressed)
    this._calculate()

  this._operator = operator
  this._isOperatorSet = true
  this._isEqualPressed = false
  this._lastCalculatedNumber = parseFloat(this._currentNumber.innerHTML)

  // Prepares and sets the expression
  const expression = this._expression.innerHTML === '' ?
    `${this._currentNumber.innerHTML}${this._operator}` :
    `${this._expression.innerHTML}${this._operator}`

  this._setExpression(expression)
}

// Clears result
Calculator.prototype.clear = function () {
  this._operator = ''
  this._isEqualPressed = false
  this._lastCalculatedNumber = null
  this._setExpression('')
  this._setCurrentNumber('0')
}

// Maintains expression
Calculator.prototype._setExpression = function (expression) {
  this._expression.innerHTML = expression
}

// Checks expression's validity
Calculator.prototype._isExpressionInvalid = function () {
  const pattern = /[\+\-\*\/\.]{2,}|[\+\-\*\/\.]{1}$/gm
  return pattern.test(this._expression.innerHTML)
}

// Handles current number being used by the user
Calculator.prototype._setCurrentNumber = function (number) {
  this._currentNumber.innerHTML = number
}

// Performs specific action for the result
Calculator.prototype._calculate = function () {
  if (!this._operator || this._lastCalculatedNumber === null) return

  // Raises alert for invalid expression
  if (this._isExpressionInvalid()) {
    alert('Malformed expression')
    return
  }

  let result = 0
  const number = parseFloat(this._currentNumber.innerHTML)

  // Decides action depending on operators
  switch (this._operator) {
    case '+':
      result = this.add(this._lastCalculatedNumber, number)
      break
    case '-':
      result = this.subtract(this._lastCalculatedNumber, number)
      break
    case '*':
      result = this.multiply(this._lastCalculatedNumber, number)
      break
    case '/':
      result = this.divide(this._lastCalculatedNumber, number)
      break
  }

  // Sets result and empties calculated number
  this._setCurrentNumber(result)
  this._lastCalculatedNumber = null
}