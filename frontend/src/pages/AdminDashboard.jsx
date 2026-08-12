import { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/Header";

function AdminDashboard() {

    const [date, setDate] = useState("");
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [userReport, setUserReport] = useState([]);
    const [userReportLoading, setUserReportLoading] = useState(false);
    const [userReportRequested, setUserReportRequested] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const response = await api.get(
                "/api/admin/users"
            );

            setUsers(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch users",
                error
            );

        }
    };


    const getUserReport = async () => {

        if (!selectedUser) {
            return;
        }

        setUserReportRequested(true);
        setUserReportLoading(true);

        try {

            const response = await api.get(
                `/api/admin/reports/user/${selectedUser}`
            );

            setUserReport(response.data);

        } catch (error) {

            console.error(
                "Failed to fetch user report",
                error
            );

        } finally {

            setUserReportLoading(false);
        }
    };

    const getDailyReport = async () => {

        if (!date) {
            setError("Please select a date.");
            return;
        }

        setLoading(true);
        setError("");

        try {

            const response = await api.get(
                `/api/admin/reports/daily?date=${date}`
            );

            setReport(response.data);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load report."
            );

        } finally {

            setLoading(false);
        }
    };


    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#181818] px-6 py-10 text-white">

            <div className="mx-auto w-full max-w-2xl">

                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-gray-400">
                    View game statistics and reports.
                </p>


             

                <div className="mt-8">

                    <h2 className="text-xl font-semibold">
                        Daily Report
                    </h2>


                    <label className="mt-6 block text-sm text-gray-400">
                        Select Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                        className="
                            mt-2
                            w-full
                            rounded-lg
                            border
                            border-[#3a3a3c]
                            bg-[#181818]
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-green-500
                        "
                    />


                    <button
                        onClick={getDailyReport}
                        disabled={loading}
                        className="
                            mt-4
                            rounded-lg
                            bg-green-600
                            px-6
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-green-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            cursor-pointer
                        "
                    >
                        {loading
                            ? "Loading..."
                            : "Generate Report"
                        }
                    </button>


                    {error && (
                        <p className="mt-4 text-sm text-red-400">
                            {error}
                        </p>
                    )}


                    {report && (
                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-[#3a3a3c]
                                    bg-[#181818]
                                    p-6
                                "
                            >
                                <p className="text-sm text-gray-400">
                                    Number of Users
                                </p>

                                <p className="mt-2 text-4xl font-bold">
                                    {report.numberOfUsers}
                                </p>
                            </div>


                            <div
                                className="
                                    rounded-xl
                                    border
                                    border-[#3a3a3c]
                                    bg-[#181818]
                                    p-6
                                "
                            >
                                <p className="text-sm text-gray-400">
                                    Correct Guesses
                                </p>

                                <p className="mt-2 text-4xl font-bold text-green-500">
                                    {report.correctGuesses}
                                </p>
                            </div>

                        </div>
                    )}

                </div>

                <div className="mt-12">

                  <h2 className="text-xl font-semibold">
                      User Report
                  </h2>

                  <label className="mt-6 block text-sm text-gray-400">
                      Select User
                  </label>

                  <select
                      value={selectedUser}
                      onChange={(e) => {
                          setSelectedUser(e.target.value);
                          setUserReport([]);
                          setUserReportRequested(false);
                      }}
                      className="
                          mt-2
                          w-full
                          rounded-lg
                          border
                          border-[#3a3a3c]
                          bg-[#181818]
                          px-4
                          py-3
                          text-white
                          outline-none
                          focus:border-green-500
                      "
                  >

                      <option value="">
                          Select a user
                      </option>

                      {users.map((user) => (
                          <option
                              key={user.id}
                              value={user.id}
                          >
                              {user.username}
                          </option>
                      ))}

                  </select>


                  <button
                      onClick={getUserReport}
                      disabled={
                          !selectedUser ||
                          userReportLoading
                      }
                      className="
                          mt-4
                          rounded-lg
                          bg-green-600
                          px-6
                          py-3
                          font-semibold
                          text-white
                          transition
                          hover:bg-green-700
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                          cursor-pointer
                      "
                  >
                      {userReportLoading
                          ? "Loading..."
                          : "View Report" 
                      }
                  </button>

                  {userReport.length > 0 && (
                      <div className="mt-8 overflow-hidden rounded-xl border border-[#3a3a3c]">

                          <table className="w-full text-left">

                              <thead className="bg-[#212121]">

                                  <tr>
                                      <th className="px-4 py-3 text-sm text-gray-400">
                                          Date
                                      </th>

                                      <th className="px-4 py-3 text-sm text-gray-400">
                                          Words Tried
                                      </th>

                                      <th className="px-4 py-3 text-sm text-gray-400">
                                          Correct Guesses
                                      </th>
                                  </tr>

                              </thead>


                              <tbody>

                                  {userReport.map((item) => (

                                      <tr
                                          key={item.date}
                                          className="border-t border-[#3a3a3c]"
                                      >

                                          <td className="px-4 py-3">
                                              {item.date}
                                          </td>

                                          <td className="px-4 py-3">
                                              {item.wordsTried}
                                          </td>

                                          <td className="px-4 py-3 text-green-500">
                                              {item.correctGuesses}
                                          </td>

                                      </tr>

                                  ))}

                              </tbody>

                          </table>

                      </div>
                  )}

                  {userReportRequested && !userReportLoading && userReport.length === 0 && (
                      <p className="mt-6 text-sm text-gray-400">
                          No games played by this user.
                      </p>
                  )}

              </div>

            </div>

        </div>
      </>
    );
}

export default AdminDashboard;