import ErrorWithCause from './ErrorWithCause'

describe('ErrorWithCause', () => {
  it('should create an error with no mesasge', () => {
    const e = new ErrorWithCause()
    expect(e).toBeInstanceOf(ErrorWithCause)
    expect(e.message).toBe('')
    expect(e.cause).toBeUndefined()
  })

  it('should create an error with a mesasge', () => {
    const e = new ErrorWithCause('test message')
    expect(e.message).toBe('test message')
    expect(e.cause).toBeUndefined()
  })

  it('should create an error with a mesasge and a cause', () => {
    const cause = new TypeError('cause')
    const e = new ErrorWithCause('test message', { cause })
    expect(e.message).toBe('test message')
    expect(e.cause).toBe(cause)
  })

  it('should support typed cause', () => {
    const cause = 'String Error'
    const e = new ErrorWithCause<{ cause: string }>('test message', { cause })
    expect(e.message).toBe('test message')
    expect(e.cause).toBe(cause)
    // Check that TypeScript sees e.cause as a string so there's no type error
    expect(e.cause.toLowerCase()).toBe('string error')
  })

  it('should error on mismatched typed cause', () => {
    const cause = 'String Error'
    // @ts-expect-error
    const e = new ErrorWithCause<{ cause: Error }>('test message', { cause })
    expect(e.message).toBe('test message')
    expect(e.cause).toBe(cause)
    // Check that TypeScript sees e.cause as a string so there's no type error
    // @ts-expect-error
    expect(e.cause.toLowerCase()).toBe('string error')
  })

  it('should ignore unknown properties in options object', () => {
    const cause = new TypeError('cause')
    const e = new ErrorWithCause('test message', { cause, details: { arg1: 'foo' } })
    expect(e.message).toBe('test message')
    expect(e.cause).toBe(cause)
    expect(Object.getOwnPropertyNames(e)).toStrictEqual(['stack', 'message', 'name', 'cause'])
  })
})

/*

const b = new ErrorWithCause('test')
b.cause
const c = new ErrorWithCause<{ cause: string }>('test', {})
c.cause
const d = new ErrorWithCause<{ cause: string }>('test', { cause: 'hi' })
d.cause
const e = new ErrorWithCause('test', { cause: 'hi' })
e.cause
const f = new ErrorWithCause('test', { details: 'test' })
f.cause

const foo = new ErrorWithCause<undefined>('bar')
const foo2 = new ErrorWithCause<string>('bar')
const foo3 = new ErrorWithCause<string>('bar', {})
const foo4 = new ErrorWithCause<string>('bar', { cause: undefined })
const foo5 = new ErrorWithCause<string>('bar', { cause: 'bar' })

const foo6 = new ErrorWithCause('baz')
const foo7 = new ErrorWithCause('baz', {})
const foo8 = new ErrorWithCause('baz', { cause: undefined })
const foo9 = new ErrorWithCause('baz', { cause: 'bar' })

 */
