const http = require("http") ;
const fs = require("fs") ;
const path = require("path") ;
const { error } = require("console");

const server = http.createServer((req,res)=>{
  
        if(req.url=='/'){
            console.log("Home Page") ;
            res.write("<h1>Home Page <br/> <br/> </h1>") ;
            let pathNameMain = __dirname ;
            let html1 = `` ;
            fs.readdir(pathNameMain,(errorMain, resultMain)=>{
                if(errorMain){
                    console.log(errorMain) ;
                    res.end(`<h1 style="text-align:center">Error Occured ! 404 Page Not Found...</h1>`) ;
                }else{
                    console.log(resultMain) ;
                    // checking that the file is a directory or file 
                    resultMain.map((folder,i)=>{
                        fs.stat(folder,(error1,stats)=>{
                            if(stats.isDirectory()){
                                console.log(folder," is a directory ") ;
                                html1 = `<h1 style="display : flex ; gap: 20px ; align-items : center "><li>
                                <img width="20" height="20" src="data:image/png;base64,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" alt="folder" />
                                <a href="${folder}" style="text-decoration : none">
                                ${folder}
                                </a></li>
                                </h1>`
                                res.write(html1) ;
                            }else{
                                if(stats.isFile()){
                                    console.log(folder," is a file ") ;
                                    html1 = `<h1 style="display : flex ; gap : 20px ; align-items : center "><li>
                                    <img width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAABCQkL7+/v39/dPT0+mpqbGxsbs7OwXFxe2trbJycl3d3fU1NQvLy+jo6M7OzuPj4/j4+NJSUmFhYVvb29VVVVbW1tnZ2fX19dgYGDg4OAgICA8PDxiYmKTk5MoKCh+fn68vLwLCwucnJySkpJeWSrHAAAErUlEQVR4nO3d63KiQBSFURAiFyUqERM1idHJvP8rzkQdoa1Aw4HeRzP7+03RrECkikvjeYwxxhhjjLFbK87SsdMOWajpyzavvvNei7WWL1i4552a6uzHoEABfX+lQpzigL7/rEAcI4F/92KMBoZzrBB/oEb/Bk4jlz2WRPSBev4dnQZuh3nz1YinH9LE8X9HYPwvQA/UYHUcc+54TFMIJQYPxyFHGGGicKBihQ9LPBErfPLwRLQQT4QLS+IGQ8QL0XtRQQgmagixB6qKEErUESIPVCUhkKglLInvrofWEsL+F/WEKKKiEHSgagpL4ovDKwyqQshe1BVWiM72orIQcKBqCytER5ugLnRO1Be6PlBvQFgSCxfEWxC6PVBvQuj0QL0NocsDFST0TsN81A7jjogSnu+kL2sXuDxLMPSBWiPMZp+z1n3OJtatSv9t/6zucZTLvZspQNj92QXrtYj4V/uVpe6Fglv7O9tAv9uv623Qf5lvhavuwifbcRo+tF/ZxLnwvbtwZR0pH7Ve2cK5MLJswTeN7UOFL21XVjgXerOPbr6k3V99UrRb72rIE0bN2SLMOtX6OYd4O2kqOt8qBgiVCkY/XRhSKIhCbBRKohAbhZIoxEahJAqxUSiJQmwUSqIQG06YL0b1vT3tqlee8uVo3rB0U/PRItcR5raLfqOSuO33fu2HQYQJl03bdKy8ALzvBby63wYT2q+/l3fA+r6+OFIRdtmHfd+x1dmHW9vNvsfy/3DdD5hsVYTedvrY0HxZ/XlYF03LWpoaQJ4PRVGIjUJJFGKjUBKF2CiURCE2CiVRiI1CSf+rMEinRTF13d8hUtMCE4ZPPqqrgVHCTxjQ9z9VhLhdePUaDUwInEjRfOIZJsyAwkxF6EWrBNMqMsYFng+DGNMVhWd8SRRio1AShdgolEQhNgolUYiNQkkUYqNQ0hDzYlxPkmGsaT1uWjozh4UJg36P4xWVldkeAjTn84cJ+37yYnZZk33uAmOqApiwwxQW31Y+M7q3LvugIhTMi2H0fFmT/Rs97ypCwbwYRuUEM/anT43Libjf0q7zYhi9Vm9FpI+Ny37MjHGBZ4tw3W1ijErruP2a1tfD8owviEJsFEqiEBuFkijERqEkCrFRKIlCbBRKqhHGkyiKGidx7N/XCFdTSuKEuw6z/vbqlzk7L0x4APm+OqgIn4HC5+rAMKFgpmRxxgTEMGHatEkDZ0zejbszs4cB9zp3Zjxve0gRHcwJB3jGF0UhNgolUYiNQkkUYqNQEoXYKJREITYKJbkX5tu8vh/whmXU/F74m/mNtTsUbht9XxlPFN+hcGcVvlQXv0Ph3irUmXFguOz3B4zHL+9QaP1WpPlpyDsUet5kt6jv90Fp9ha1KJREITYKJVGIjUJJFGKjUBKF2CiURCE2CiUFp6f05jciPH15aNCvx5/nuUxy+5KA8uS4NYV9yQ6d3ycfdqXSztetFoOudHJaqb9JI+3SzXlbJvbN7lDY96Nbwzf0j0LfSTCGb2zf6G4h59Rt0/A/Cdbr0tiKQU8V5+zzc+Aa9nf0UrZJtGXHkk1m31hhcZaOtUuz2L6hjDHGGGOMMXB/AFbjgPStNOjZAAAAAElFTkSuQmCC" alt="file" />
                                    <a href="${folder}" style="text-decoration : none">
                                    ${folder}
                                    </a></li>
                                    </h1>`
                                    res.write(html1) ;
                                }
                            }
                        })
                        
                    })
                    setTimeout(() => {
                        res.end() ;  // because of sync nature of js , so use timeout so that data will be loaded completely
                    }, 500);
                }
                
            })
        }else{
            if(req.url=="/favicon.ico"){
                // console.log("path of req.url is ",req.url) ;
                res.end(`<h1>page not found ! </h1>`) ;
            }else{
                if(req.url){
                // console.log("main path of req.url is ",req.url) ;
                let pathName2 = path.join(__dirname,req.url) ;
                // console.log("complete path is ",pathName2) ;
                
                fs.stat(pathName2,(error2,stats2)=>{
                    if(error2){
                        console.log(error2) ;
                        res.end(`<h1 style="text-align : center ; margin-top : 10%">Page Not Found ! </h1>`)
                    }else{
                        
                    if(stats2.isDirectory()){
                        console.log("directory") ;
                        res.write(`<h1>${req.url} <br/><br/> </h1>`) ;
                        fs.readdir(pathName2,(errD1,resultFolders)=>{
                            if(errD1){
                                console.log(errD1) ;
                                res.end(`<h1 style="text-align:center">404 Page Not Found ! </h1>`) ;
                            }else{

                                console.log(resultFolders) ;
                                let htmlCodeNext1 , htmlCodeNext2 ;

                                resultFolders.forEach(files=>{
                                    // console.log(files);
                                    let pathName3 = path.join(__dirname,req.url,files) ;
                                    console.log("pathName 3 is : ",pathName3) ;
                                    
                                    fs.stat(pathName3,(errorNext,statsNext)=>{
                                        if(errorNext){
                                            console.log(errorNext);
                                        }else {
                                        if(statsNext.isDirectory()){
                                            // console.log("directory") ;
                                             htmlCodeNext1 = `<h1 style="display : flex ; gap : 20px ; align-items : center">
                                              <li>
                                                <img width="20" height="20" src="data:image/png;base64,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" alt="folder" />
                                                <a href="${req.url}/${files}" style="text-decoration : none">
                                                   ${files}
                                                </a>
                                              </li>
                                            </h1>
                                            `
                                            res.write(htmlCodeNext1) ;
                                        }
                                        else{
                                            if(statsNext.isFile()){
                                                console.log("file") ;
                                                 htmlCodeNext2 = `<h1 style="display : flex ; align-items : center ; gap : 20px">
                                                <li>
                                                <img width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAABCQkL7+/v39/dPT0+mpqbGxsbs7OwXFxe2trbJycl3d3fU1NQvLy+jo6M7OzuPj4/j4+NJSUmFhYVvb29VVVVbW1tnZ2fX19dgYGDg4OAgICA8PDxiYmKTk5MoKCh+fn68vLwLCwucnJySkpJeWSrHAAAErUlEQVR4nO3d63KiQBSFURAiFyUqERM1idHJvP8rzkQdoa1Aw4HeRzP7+03RrECkikvjeYwxxhhjjLFbK87SsdMOWajpyzavvvNei7WWL1i4552a6uzHoEABfX+lQpzigL7/rEAcI4F/92KMBoZzrBB/oEb/Bk4jlz2WRPSBev4dnQZuh3nz1YinH9LE8X9HYPwvQA/UYHUcc+54TFMIJQYPxyFHGGGicKBihQ9LPBErfPLwRLQQT4QLS+IGQ8QL0XtRQQgmagixB6qKEErUESIPVCUhkKglLInvrofWEsL+F/WEKKKiEHSgagpL4ovDKwyqQshe1BVWiM72orIQcKBqCytER5ugLnRO1Be6PlBvQFgSCxfEWxC6PVBvQuj0QL0NocsDFST0TsN81A7jjogSnu+kL2sXuDxLMPSBWiPMZp+z1n3OJtatSv9t/6zucZTLvZspQNj92QXrtYj4V/uVpe6Fglv7O9tAv9uv623Qf5lvhavuwifbcRo+tF/ZxLnwvbtwZR0pH7Ve2cK5MLJswTeN7UOFL21XVjgXerOPbr6k3V99UrRb72rIE0bN2SLMOtX6OYd4O2kqOt8qBgiVCkY/XRhSKIhCbBRKohAbhZIoxEahJAqxUSiJQmwUSqIQG06YL0b1vT3tqlee8uVo3rB0U/PRItcR5raLfqOSuO33fu2HQYQJl03bdKy8ALzvBby63wYT2q+/l3fA+r6+OFIRdtmHfd+x1dmHW9vNvsfy/3DdD5hsVYTedvrY0HxZ/XlYF03LWpoaQJ4PRVGIjUJJFGKjUBKF2CiURCE2CiVRiI1CSf+rMEinRTF13d8hUtMCE4ZPPqqrgVHCTxjQ9z9VhLhdePUaDUwInEjRfOIZJsyAwkxF6EWrBNMqMsYFng+DGNMVhWd8SRRio1AShdgolEQhNgolUYiNQkkUYqNQ0hDzYlxPkmGsaT1uWjozh4UJg36P4xWVldkeAjTn84cJ+37yYnZZk33uAmOqApiwwxQW31Y+M7q3LvugIhTMi2H0fFmT/Rs97ypCwbwYRuUEM/anT43Libjf0q7zYhi9Vm9FpI+Ny37MjHGBZ4tw3W1ijErruP2a1tfD8owviEJsFEqiEBuFkijERqEkCrFRKIlCbBRKqhHGkyiKGidx7N/XCFdTSuKEuw6z/vbqlzk7L0x4APm+OqgIn4HC5+rAMKFgpmRxxgTEMGHatEkDZ0zejbszs4cB9zp3Zjxve0gRHcwJB3jGF0UhNgolUYiNQkkUYqNQEoXYKJREITYKJbkX5tu8vh/whmXU/F74m/mNtTsUbht9XxlPFN+hcGcVvlQXv0Ph3irUmXFguOz3B4zHL+9QaP1WpPlpyDsUet5kt6jv90Fp9ha1KJREITYKJVGIjUJJFGKjUBKF2CiURCE2CiUFp6f05jciPH15aNCvx5/nuUxy+5KA8uS4NYV9yQ6d3ycfdqXSztetFoOudHJaqb9JI+3SzXlbJvbN7lDY96Nbwzf0j0LfSTCGb2zf6G4h59Rt0/A/Cdbr0tiKQU8V5+zzc+Aa9nf0UrZJtGXHkk1m31hhcZaOtUuz2L6hjDHGGGOMMXB/AFbjgPStNOjZAAAAAElFTkSuQmCC" alt="file" />
                                                <a href="${req.url}/${files}" style="text-decoration : none">
                                                   ${files}
                                                </a>
                                                </li>
                                                </h1>`
                                                res.write(htmlCodeNext2) ;
                                                
                                            }
                                        }
                                      }
                                    })
                                })

                               setTimeout(() => {
                                res.end() ;
                               }, 500);
                            }
                        })
                    }
                    else{
                        if(stats2.isFile()){
                            console.log("file") ;
                            fs.readFile(pathName2,"utf-8",(error21,data2)=>{
                                if(error21){
                                    console.log(error21) ;
                                }else{
                                    res.end(data2) ;
                                }
                            })
                        }
                    }
                }
                })
            }
        
        }
        }
    
}) ;

server.listen(8080,()=>{
    console.log("\n server is running ...\n") ;
})