import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, Eye, Clock } from 'lucide-react';

const Moderate = () => {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState(new Set());

  const pendingItems = [
    {
      id: 1,
      title: 'Breaking: Local Election Results',
      author: 'John Doe',
      submittedAt: '2024-01-15 10:30',
      category: 'News',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Sports: Championship Finals',
      author: 'Jane Smith',
      submittedAt: '2024-01-15 09:15',
      category: 'Sports',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Tech: AI Developments',
      author: 'Mike Johnson',
      submittedAt: '2024-01-15 08:45',
      category: 'Technology',
      status: 'pending'
    }
  ];

  const handleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleApprove = (id) => {
    console.log('Approving item:', id);
    // Add approval logic here
  };

  const handleReject = (id) => {
    console.log('Rejecting item:', id);
    // Add rejection logic here
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving items:', Array.from(selectedItems));
    // Add bulk approval logic here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">
          {t('moderation.title')}
        </h1>
        <p className="text-gray-600">
          Review and moderate submitted content
        </p>
      </div>

      {/* Bulk Actions */}
      {selectedItems.size > 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <p className="text-blue-800">
              {selectedItems.size} item(s) selected
            </p>
            <div className="space-x-2">
              <button
                onClick={handleBulkApprove}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Check size={16} />
                <span>Approve Selected</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Items */}
      <div className="space-y-4">
        {pendingItems.map((item) => (
          <div key={item.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="rounded border-gray-300"
                  />
                  <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    {item.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Author:</span> {item.author}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {item.category}
                  </div>
                  <div>
                    <span className="font-medium">Submitted:</span> {item.submittedAt}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>Pending review</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button className="btn flex items-center space-x-1">
                  <Eye size={16} />
                  <span>Preview</span>
                </button>
                
                <button
                  onClick={() => handleApprove(item.id)}
                  className="btn btn-primary flex items-center space-x-1"
                >
                  <Check size={16} />
                  <span>Approve</span>
                </button>
                
                <button
                  onClick={() => handleReject(item.id)}
                  className="btn flex items-center space-x-1 text-red-600 border-red-600 hover:bg-red-50"
                >
                  <X size={16} />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pendingItems.length === 0 && (
        <div className="card text-center py-12">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No pending items
          </h3>
          <p className="text-gray-500">
            All content has been reviewed and moderated.
          </p>
        </div>
      )}
    </div>
  );
};

export default Moderate;
