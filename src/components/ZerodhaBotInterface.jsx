import React, { useState } from 'react';
import { List, History, AlignLeft } from 'lucide-react';

const ToggleSwitch = ({ checked, onChange, id }) => (
  <label className="relative inline-block w-12 h-6 cursor-pointer">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="sr-only peer"
    />
    <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-blue-500"></span>
    <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
  </label>
);

const InputCard = ({ title, enabled, onToggle, values, onValueChange }) => (
  <div className="border-2 border-gray-200 rounded-xl p-5 w-full">
    <div className="flex justify-between items-center mb-5">
      <p className="font-semibold text-base">{title}</p>
      <ToggleSwitch checked={enabled} onChange={onToggle} id={title.toLowerCase()} />
    </div>
    <div className="flex flex-col gap-3">
      {['Profit 1 %', 'Profit 2 %', 'Profit 3 %', 'Stop Loss %'].map((label, idx) => (
        <div key={idx} className="flex justify-between items-center">
          <p className="text-xs font-semibold">{label}</p>
          <div className="flex items-center">
            <input
              className="w-16 rounded-l-md border border-gray-200 text-center text-sm px-2 py-1"
              type="number"
              value={values[idx]}
              onChange={(e) => onValueChange(idx, e.target.value)}
            />
            <span className="bg-gray-200 px-2 py-1 font-semibold border border-gray-200 rounded-r-md text-sm">%</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function ZerodhaBotInterface() {
  const [activeTab, setActiveTab] = useState('sltp');
  
  const [spotEnabled, setSpotEnabled] = useState(true);
  const [spotValues, setSpotValues] = useState([1.25, 8, 12, 12]);
  
  const [futuresEnabled, setFuturesEnabled] = useState(true);
  const [futuresValues, setFuturesValues] = useState([5.25, 10, 15, 10]);
  
  const [optionsEnabled, setOptionsEnabled] = useState(true);
  const [optionsValues, setOptionsValues] = useState([7.5, 17.5, 27.5, 30]);
  
  const [mtCopyEnabled, setMtCopyEnabled] = useState(true);
  const [mtCopyValues, setMtCopyValues] = useState([5.25, 5.25, 5.25, 5.25]);

  return (
    <div className="flex h-screen w-screen bg-white font-sans">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 p-5">
        <div className="flex flex-col gap-2 p-2">
          <p className="text-gray-500 text-xs font-semibold mb-2">Monitor</p>
          
          <a href="/" className="flex gap-4 items-center font-bold hover:bg-gray-100 p-2 rounded cursor-pointer">
            <List size={16} />
            <p>Main</p>
          </a>
          
          <a href="/history" className="flex gap-4 items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
            <History size={16} />
            <p>History</p>
          </a>
          
          <div className="w-full h-px bg-gray-200 my-2"></div>
          
          <p className="text-gray-500 text-xs font-semibold mb-2">Info</p>
          
          <a href="/logs" className="flex gap-4 items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
            <AlignLeft size={16} />
            <p>Logs</p>
          </a>
          
          <div className="w-full h-px bg-gray-200 my-2"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center pt-5 overflow-y-auto">
        <h1 className="text-xl font-bold mb-5">Zerodha TPSL and MT Copy Bot</h1>
        
        <div className="w-full h-px bg-gray-200 mb-10"></div>

        {/* Inputs Section */}
        <div className="border-2 border-gray-200 w-11/12 max-w-7xl rounded-2xl p-5 shadow-md mb-5">
          <p className="font-semibold text-base mb-1">Inputs</p>
          <p className="text-gray-500 text-sm font-medium mb-5">Inputs for spot, futures and options</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            <InputCard
              title="Spot"
              enabled={spotEnabled}
              onToggle={() => setSpotEnabled(!spotEnabled)}
              values={spotValues}
              onValueChange={(idx, val) => {
                const newVals = [...spotValues];
                newVals[idx] = val;
                setSpotValues(newVals);
              }}
            />
            
            <InputCard
              title="Futures"
              enabled={futuresEnabled}
              onToggle={() => setFuturesEnabled(!futuresEnabled)}
              values={futuresValues}
              onValueChange={(idx, val) => {
                const newVals = [...futuresValues];
                newVals[idx] = val;
                setFuturesValues(newVals);
              }}
            />
            
            <InputCard
              title="Options"
              enabled={optionsEnabled}
              onToggle={() => setOptionsEnabled(!optionsEnabled)}
              values={optionsValues}
              onValueChange={(idx, val) => {
                const newVals = [...optionsValues];
                newVals[idx] = val;
                setOptionsValues(newVals);
              }}
            />
            
            <InputCard
              title="MT Copy"
              enabled={mtCopyEnabled}
              onToggle={() => setMtCopyEnabled(!mtCopyEnabled)}
              values={mtCopyValues}
              onValueChange={(idx, val) => {
                const newVals = [...mtCopyValues];
                newVals[idx] = val;
                setMtCopyValues(newVals);
              }}
            />
          </div>
          
          <div className="flex justify-center">
            <button className="bg-black text-white rounded-md px-6 py-2 font-semibold hover:bg-gray-800 transition">
              Save
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 w-11/12 max-w-7xl mb-5">
          <button
            className={`flex-1 text-center rounded-md font-semibold py-2 transition ${
              activeTab === 'sltp' ? 'bg-white text-black' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('sltp')}
          >
            SLTP Trades
          </button>
          <button
            className={`flex-1 text-center rounded-md font-semibold py-2 transition ${
              activeTab === 'mtcopy' ? 'bg-white text-black' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('mtcopy')}
          >
            MT Copy Trades
          </button>
        </div>

        {/* Trades Table */}
        <div className="border-2 border-gray-100 rounded-lg p-5 w-11/12 max-w-7xl mb-5 shadow-sm">
          <p className="font-semibold text-base mb-1">SLTP Trades</p>
          <p className="text-gray-500 text-sm font-medium mb-8">Trades and status of orders</p>
          
          <div className="overflow-x-auto">
            <div className="flex font-semibold text-xs min-w-max">
              {/* Headers */}
              <div className="flex w-64 flex-shrink-0">
                <div className="w-1/3 text-center px-2">Symbol</div>
                <div className="w-1/3 text-center px-2">InstrType</div>
                <div className="w-1/3 text-center px-2">Position</div>
              </div>
              
              <div className="flex flex-1">
                <div className="flex flex-col flex-1">
                  <div className="flex mb-2">
                    <div className="flex-1 text-center px-2">Entry</div>
                    <div className="flex-1 text-center px-2">Profit 1</div>
                    <div className="flex-1 text-center px-2">Profit 2</div>
                    <div className="flex-1 text-center px-2">Profit 3</div>
                    <div className="flex-1 text-center px-2">Stop Loss</div>
                  </div>
                  
                  <div className="w-full h-px bg-gray-200 mb-2"></div>
                  
                  <div className="flex text-xs">
                    <div className="flex flex-1">
                      <div className="flex-1 text-center px-1">Qty</div>
                      <div className="flex-1 text-center px-1">AvgPrice</div>
                    </div>
                    <div className="flex flex-1">
                      <div className="flex-1 text-center px-1">Qty</div>
                      <div className="flex-1 text-center px-1">Price</div>
                      <div className="flex-1 text-center px-1">Status</div>
                    </div>
                    <div className="flex flex-1">
                      <div className="flex-1 text-center px-1">Qty</div>
                      <div className="flex-1 text-center px-1">Price</div>
                      <div className="flex-1 text-center px-1">Status</div>
                    </div>
                    <div className="flex flex-1">
                      <div className="flex-1 text-center px-1">Qty</div>
                      <div className="flex-1 text-center px-1">Price</div>
                      <div className="flex-1 text-center px-1">Status</div>
                    </div>
                    <div className="flex flex-1">
                      <div className="flex-1 text-center px-1">Price</div>
                      <div className="flex-1 text-center px-1">Status</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full h-px bg-gray-200 my-2"></div>
            
            <p className="text-center text-gray-500 italic font-normal py-2">
              No copy trades yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}