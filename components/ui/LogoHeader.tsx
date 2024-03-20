/* eslint-disable @next/next/no-img-element */

export const LogoHeader = ({ header }: { header: string }) => {
    return (
        <div>
            <img
                className="w-auto h-12 mx-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">{header}</h2>
        </div>
    );
};
