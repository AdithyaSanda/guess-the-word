import { useState } from "react";
import api from "../services/api";

function AdminDashboard() {

    const [date, setDate] = useState("");
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


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
        <div className="min-h-screen bg-[#101010] px-6 py-10 text-white">

            <div className="mx-auto w-full max-w-2xl">

                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-gray-400">
                    View game statistics and reports.
                </p>


                {/* Daily Report */}

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


                    {/* Results */}

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

            </div>

        </div>
    );
}

export default AdminDashboard;