import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    msg: "",
    consent: false,
  });

  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validation Logic
    Object.keys(formData).forEach((field) => {
      if (!formData[field] && field !== "consent") {
        newErrors[field] = `${field} is required`;
      }
    });

    // Specific Validations
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.consent) {
      newErrors.consent =
        "To submit this form, please consent to being contacted.";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage("Form submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        queryType: "",
        msg: "",
        consent: false,
      });
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <>
      <main className="w-full min-h-screen flex flex-col items-center bg-Green-200 py-12 md:py-16">
        <div className="max-w-3xl w-11/12 md:w-[768px] bg-white p-8 rounded-lg font-primary">
          <h1 className="text-3xl font-bold mb-5 text-gray-900">Contact Us</h1>

          {successMessage && (
            <p className="bg-green-100 text-green-800 p-4 rounded mb-6 text-center">
              {successMessage}
            </p>
          )}

          <form
            className="flex flex-col gap-6 text-gray-900"
            onSubmit={handleFormSubmit}
          >
            {/* First Name */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-1/2 flex flex-col">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  className={`p-3 rounded-md w-full mt-2 border ${
                    error.firstName ? "border-red-500" : "border-gray-900"
                  }`}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  aria-invalid={!!error.firstName}
                  aria-describedby="firstNameError"
                />
                {error.firstName && (
                  <p id="firstNameError" className="text-red-500 text-sm mt-1">
                    {error.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="w-full md:w-1/2">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  className={`p-3 rounded-md w-full mt-2 border ${
                    error.lastName ? "border-red-500" : "border-gray-900"
                  }`}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  aria-invalid={!!error.lastName}
                  aria-describedby="lastNameError"
                />
                {error.lastName && (
                  <p id="lastNameError" className="text-red-500 text-sm mt-1">
                    {error.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">Email Address *</label>
              <input
                type="text"
                id="email"
                className={`p-3 rounded-md w-full mt-2 border ${
                  error.email ? "border-red-500" : "border-gray-900"
                }`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                aria-invalid={!!error.email}
                aria-describedby="emailError"
              />
              {error.email && (
                <p id="emailError" className="text-red-500 text-sm mt-1">
                  {error.email}
                </p>
              )}
            </div>

            {/* Query Type */}
            <div className="flex flex-col gap-3">
              <h2>Query Type *</h2>
              <div className="flex flex-col md:flex-row gap-5">
                {["General Enquiry", "Support Request"].map((type) => (
                  <label
                    key={type}
                    htmlFor={type}
                    className={`w-full md:w-1/2 border px-5 py-3 rounded-lg flex items-center gap-3 text-[20px] cursor-pointer ${
                      formData.queryType === type
                        ? "border-blue-500"
                        : "border-gray-900"
                    }`}
                  >
                    <input
                      type="radio"
                      id={type}
                      name="queryType"
                      value={type}
                      checked={formData.queryType === type}
                      onChange={(e) =>
                        setFormData({ ...formData, queryType: e.target.value })
                      }
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {error.queryType && (
                <p className="text-red-500 text-sm mt-1">{error.queryType}</p>
              )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-3">
              <label htmlFor="msg">Message *</label>
              <textarea
                id="msg"
                rows="4"
                className={`w-full rounded-lg border py-2 px-3 resize-none ${
                  error.msg ? "border-red-500" : "border-gray-900"
                }`}
                value={formData.msg}
                onChange={(e) =>
                  setFormData({ ...formData, msg: e.target.value })
                }
                aria-invalid={!!error.msg}
                aria-describedby="msgError"
              />
              {error.msg && (
                <p id="msgError" className="text-red-500 text-sm mt-1">
                  {error.msg}
                </p>
              )}
            </div>

            {/* Consent */}
            <div>
              <label className="ps-1 flex gap-5 items-center mt-2">
                <input
                  type="checkbox"
                  id="consent"
                  className="transform scale-150"
                  checked={formData.consent}
                  onChange={() =>
                    setFormData({ ...formData, consent: !formData.consent })
                  }
                />
                <span>I consent to being contacted by the team</span>
              </label>
              {error.consent && (
                <p className="text-red-500 text-sm mt-1">{error.consent}</p>
              )}
            </div>

            <button className="w-full p-3 rounded-lg bg-green-600 text-white font-bold mt-2 hover:bg-green-700 focus:ring focus:ring-green-400">
              Submit
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
