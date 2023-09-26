import React from 'react'

function admin() {
  return (
    <section className="vh-100 bg-gray-200">
      <div className="container h-screen mx-auto flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-5">
              Student Sign up
            </h1>
            <form className="space-y-4">
              <div className="flex items-center space-x-2">
                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                <div className="flex-grow">
                  <input
                    type="text"
                    id="form3Example1c"
                    className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="form3Example1c"
                  >
                    Your Name
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div className="flex-grow">
                  <input
                    type="email"
                    id="form3Example3c"
                    className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="form3Example3c"
                  >
                    Your Email
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div className="flex-grow">
                  <input
                    type="password"
                    id="form3Example4c"
                    className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="form3Example4c"
                  >
                    Password
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                <div className="flex-grow">
                  <input
                    type="password"
                    id="form3Example4cd"
                    className="w-full border rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor="form3Example4cd"
                  >
                    Repeat your password
                  </label>
                </div>
              </div>
              {/* <div className="flex items-center space-x-2">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        value=""
                                        id="form2Example3c"
                                    />
                                    <label className="text-sm text-gray-600" htmlFor="form2Example3c">
                                        I agree to all statements in <a href="#!">Terms of service</a>
                                    </label>
                                </div> */}
              <div className="text-center">
                <button
                  type="button" onClick={() => Alert('Logged in', 'success')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default admin