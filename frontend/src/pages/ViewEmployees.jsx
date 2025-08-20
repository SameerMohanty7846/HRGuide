import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";



import { FaPlus, FaExclamationTriangle, FaSearch, FaSpinner, FaTrash, FaUsers } from 'react-icons/fa';

const useAuth = () => ({ user: { is_master: true, permissions: [] } });
const useDebounce = (value) => value;
const useT = () => (key) => key;
const apiClient = { get: () => Promise.resolve({ data: { data: [], totalPages: 0 } }), delete: () => Promise.resolve() };
const DataTable = ({ columns, data }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
                <tr>
                    {columns.map(col => <th key={col.accessorKey} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{col.header}</th>)}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.length > 0 ? data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                        {columns.map(col => <td key={col.accessorKey} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row[col.accessorKey] || 'N/A'}</td>)}
                    </tr>
                )) : (
                    <tr><td colSpan={columns.length} className="text-center py-10 text-gray-500">No data available.</td></tr>
                )}
            </tbody>
        </table>
    </div>
);
const createColumns = () => [{ header: 'Name', accessorKey: 'name' }, { header: 'Email', accessorKey: 'email' }];
const AccessDenied = () => <div>Access Denied</div>;
const toast = { success: console.log, error: console.log };
const PERMISSIONS = { EMPLOYEE: { READ: 'read', CREATE: 'create', UPDATE: 'update', DELETE: 'delete' } };
// --- End Mocks ---


const ViewEmployees = () => {
    const [data, setData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState([{ id: 'joined_at', desc: true }]);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const { user } = useAuth();

    const canRead = user.is_master || user.permissions.includes(PERMISSIONS.EMPLOYEE.READ);
    const canCreate = user.is_master || user.permissions.includes(PERMISSIONS.EMPLOYEE.CREATE);
    const canUpdate = user.is_master || user.permissions.includes(PERMISSIONS.EMPLOYEE.UPDATE);
    const canDelete = user.is_master || user.permissions.includes(PERMISSIONS.EMPLOYEE.DELETE);

    const fetchData = useCallback(async () => {
        if (!canRead) return;
        setLoading(true);
        // ... (आपकी मौजूदा fetchData लॉजिक यहाँ रहेगी) ...
        setTimeout(() => { // Mocking API call
            setData([{ name: 'John Doe', email: 'john@example.com' }]);
            setPageCount(1);
            setLoading(false);
            // setError("This is a sample error."); // एरर स्टेट टेस्ट करने के लिए
        }, 1000);
    }, [pagination, sorting, debouncedSearchTerm, canRead, refetchTrigger]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const openDeleteDialog = (employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!employeeToDelete) return;
        try {
            await apiClient.delete(`/employees/${employeeToDelete.id}`);
            toast.success(`Employee "${employeeToDelete.name}" has been deleted.`);
            setRefetchTrigger(c => c + 1);
        } catch (err) {
            toast.error("Failed to delete employee.");
        } finally {
            setIsDeleteDialogOpen(false);
            setEmployeeToDelete(null);
        }
    };
    
    const t = useT();
    const columns = useMemo(() => createColumns({ openDeleteDialog, canUpdate, canDelete, currentUser: user, t }), [canUpdate, canDelete, user, t]);

    if (!canRead) return <AccessDenied />;

    return (
        <>
            <div className="bg-gray-50 min-h-screen py-12 px-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800">Employee Management</h1>
                        {canCreate && (
                            <Link to="/employees/add" className="flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
                                <FaPlus className="mr-2" /> Add New Employee
                            </Link>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                             <div className="flex items-center space-x-3 mb-4">
                                <FaUsers className="text-2xl text-blue-600"/>
                                <h2 className="text-2xl font-bold text-gray-800">All Employees</h2>
                             </div>
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="search"
                                    placeholder="Search by Name or Email..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="p-4">
                            {loading ? (
                                <div className="flex justify-center items-center h-80">
                                    <FaSpinner className="text-4xl text-blue-600 animate-spin" />
                                </div>
                            ) : error ? (
                                <div className="m-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start space-x-3">
                                    <FaExclamationTriangle className="text-red-500 text-xl mt-1" />
                                    <div>
                                        <h3 className="font-bold text-red-800">Error</h3>
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                </div>
                            ) : (
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pageCount={pageCount}
                                    pagination={pagination}
                                    setPagination={setPagination}
                                    sorting={sorting}
                                    setSorting={setSorting}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteDialogOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-fade-in-up">
                        <div className="p-8 text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                                <FaTrash className="text-3xl text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Are you sure?</h2>
                            <p className="text-gray-600 mt-2">
                                This action cannot be undone. This will permanently delete the account for <span className="font-semibold">{employeeToDelete?.name}</span>.
                            </p>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
                            <button onClick={() => setIsDeleteDialogOpen(false)} className="px-6 py-2 font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                                Cancel
                            </button>
                            <button onClick={confirmDelete} className="px-6 py-2 font-semibold text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors">
                                Yes, delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewEmployees;