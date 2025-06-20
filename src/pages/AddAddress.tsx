import { useState, ChangeEvent, FormEvent } from 'react';
import { assets } from '../assets/assets';

interface Address {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone:string
}

interface InputFieldProps {
  name: keyof Address;
  type: string;
  placeholder: string;
  address: Address;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  name,
  type,
  placeholder,
  address,
  handleChange,
}: InputFieldProps) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

function AddAddress() {
  const [address, setAddress] = useState<Address>({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    phone:''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted address:', address);
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSubmit} className="text-sm mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="firstName"
                type="text"
                placeholder="First Name"
                address={address}
                handleChange={handleChange}
              />
              <InputField
                name="lastName"
                type="text"
                placeholder="Last Name"
                address={address}
                handleChange={handleChange}
              />
            </div>
            <InputField
              name="email"
              type="text"
              placeholder="Email"
              address={address}
              handleChange={handleChange}
            />
            <InputField
              name="street"
              type="text"
              placeholder="Street"
              address={address}
              handleChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="city"
                type="text"
                placeholder="City"
                address={address}
                handleChange={handleChange}
              />

              <InputField
                name="zipCode"
                type="number"
                placeholder="ZIP Code"
                address={address}
                handleChange={handleChange}
              />
            </div >

            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="state"
                type="text"
                placeholder="State"
                address={address}
                handleChange={handleChange}
              />
              <InputField
                name="country"
                type="text"
                placeholder="Country"
                address={address}
                handleChange={handleChange}
              />
            </div>

            <InputField
                name="phone"
                type="number"
                placeholder="Phone"
                address={address}
                handleChange={handleChange}
              />

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dull text-white py-2 rounded transition"
            >
              Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="Add Address"
        />
      </div>
    </div>
  );
}

export default AddAddress;
