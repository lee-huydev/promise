const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const handleGet = () => {
    const valueInput = $('.input-user').value.trim();
    getDataApi(valueInput)
        .then((data) => {
        const html = `
         <table class="w-full border-collapse border border-slate-500">
         <thead>
           <tr class="h-10 text-xl bg-green-200">
             <th class="border border-slate-300 ...">Name</th>
             <th class="border border-slate-300 ...">Avatar</th>
             <th class="border border-slate-300 ...">Email</th>
             <th class="border border-slate-300 ...">Company</th>
             <th class="border border-slate-300 ...">Follower</th>
           </tr>
         </thead>
         <tbody class="h-20">
           <tr class="text-center">
             <td class="border border-slate-300 ...">${data.name || data.login}</td>
             <td class="w-28 border border-slate-300 ...">
               <img class="object-cover w-full" src="${data.avatar_url}" alt="">
             </td>
             <td class="border border-slate-300 ...">${data.email}</td>
             <td class="border border-slate-300 ...">${data.company}</td>
             <td class="border border-slate-300 ...">${data.followers}</td>
           </tr>
         </tbody>
       </table>
         `;
        $('.content-table').innerHTML = html;
    })
        .catch((err) => {
        const html = `
            <h2 class="text-2xl text-red-500 text-center">${err.message}</h2>
         `;
        $('.content-table').innerHTML = html;
    });
};
$('.btn-get').addEventListener('click', handleGet);

const getDataApi = async (username) => {
    const html = `
   <div class="border border-blue-100 shadow rounded-md p-4 max-w-sm w-full mx-auto">
   <div class="animate-pulse flex space-x-4">
     <div class="rounded-full bg-slate-200 h-10 w-10"></div>
     <div class="flex-1 space-y-6 py-1">
       <div class="h-2 bg-slate-200 rounded"></div>
       <div class="space-y-3">
         <div class="grid grid-cols-3 gap-4">
           <div class="h-2 bg-slate-200 rounded col-span-2"></div>
           <div class="h-2 bg-slate-200 rounded col-span-1"></div>
         </div>
         <div class="h-2 bg-slate-200 rounded"></div>
       </div>
     </div>
   </div>
 </div>
   `;
    $('.content-table').innerHTML = html;
    const api = 'https://api.github.com/users';
    const query = await fetch(`${api}/${username}`);
    const res = await query.json();
    const promise = new Promise((resolve, reject) => {
        const notFound = {
            status: 404,
            message: 'The user you requested was not found',
        };
        res.message ? reject(notFound) : resolve(res);
    });
    return promise;
};
