import React from 'react'

function LoginSignup() {
  return (
    <div className='myForm bg-light p-2'>
        <h1 className="text-center">Login</h1>
        <form>
            <div className="mb-3 mt-4 input-group">
                <label htmlFor="inputEmail" className="form-label material-icons">mail</label>
                <input type="email" className="form-control" id="inputEmail"/>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword"/>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Login</button>
        </form>
    </div>
  )
}

export default LoginSignup