const verificationEmailContent = (name, url) => {
  return `  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000;line-height: inherit;">
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;margin: 0 auto;background-color: #ffffff;width: 100%;line-height: inherit;color: #000000;" cellpadding="0" cellspacing="0">
     <tbody style="line-height: inherit;">
        <tr style="vertical-align: top;line-height: inherit;border-collapse: collapse;">
           <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;line-height: inherit;color: #000000;">
              <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
                 <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #dff1ff;line-height: inherit;width: calc(100% - 40px) !important;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
                       <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;line-height: inherit;width: 650px !important;">
                          <div style="width: 100% !important;line-height: inherit;margin: 0 auto;">
                             <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;">
                                <table style="font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                   <tbody style="line-height: inherit;">
                                      <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                         <td style="overflow-wrap: break-word;word-break: break-word;padding: 30px 0px;font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" align="left">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;">
                                               <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                                  <td style="padding-right: 0px;padding-left: 0px;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" align="center">
                                                     <img align="center" border="0" src="https://i.ibb.co/RQ01yQw/logo512.png" alt="logo" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 23%;max-width: 149.5px;line-height: inherit;" width="149.5">
                                                  </td>
                                               </tr>
                                            </table>
                                         </td>
                                      </tr>
                                   </tbody>
                                </table>
                                <table style="font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                   <tbody style="line-height: inherit;">
                                      <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                         <td style="overflow-wrap: break-word;word-break: break-word;padding: 0px;font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" align="left">
                                            <div style="color: #018eea; line-height: 170%; text-align: left; word-wrap: break-word;">
                                               <p style="padding-left: 20px;padding-right: 20px;font-size: 24px;line-height: 170%;text-align: center;margin: 0;">Congratulation  ${name} ! You Successfully Completed your Registration on Dook
                                               </p>
        
                                            </div>
                                         </td>
                                      </tr>
                                   </tbody>
                                </table>
                                <table style="font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                   <tbody style="line-height: inherit;">
                                      <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                         <td style="overflow-wrap: break-word;word-break: break-word;padding: 0px;font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" align="left">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;">
                                               <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                                  <td style="padding-right: 0px;padding-left: 0px;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" align="center">
                                                     <img align="center" border="0" src="https://i.ibb.co/CwvPK1s/email.jpg" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 650px;line-height: inherit;" width="650">
                                                  </td>
                                               </tr>
                                            </table>
                                         </td>
                                      </tr>
                                   </tbody>
                                </table>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
                 <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f3fbfd;line-height: inherit;width: calc(100% - 40px) !important;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
                       <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;line-height: inherit;width: 650px !important;">
                          <div style="width: 100% !important;line-height: inherit;margin: 0 auto;">
                             <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;">
                                <table id="u_content_button_1" style="font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                   <tbody style="line-height: inherit;">
                                      <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                         <td style="overflow-wrap: break-word;word-break: break-word;padding: 10px;font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" align="left">
                                            <div align="center" style="line-height: inherit;">
                                               <a href=${url} target="_blank" style="box-sizing: border-box;display: inline-block;font-family: 'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF;background-color: #0088ee;border-radius: 63px;-webkit-border-radius: 63px;-moz-border-radius: 63px;width: auto;max-width: 100%;overflow-wrap: break-word;word-break: break-word;word-wrap: break-word;mso-border-alt: none;border-top-color: #CCC;border-top-style: solid;border-top-width: 0px;border-left-color: #CCC;border-left-style: solid;border-left-width: 0px;border-right-color: #CCC;border-right-style: solid;border-right-width: 0px;border-bottom-color: #0275a4;border-bottom-style: solid;border-bottom-width: 5px;line-height: inherit;">
                                               <span class="v-padding" style="display:block;padding:14px 30px;line-height:100%;"><span style="font-size: 14px; line-height: 14px;"><strong style="line-height: inherit;"><span style="line-height: 14px; font-size: 14px;">Click Here to Verify Your
                                               Email</span></strong></span></span>
                                               </a>
                                            </div>
                                         </td>
                                      </tr>
                                   </tbody>
                                </table>
                                <table style="font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                   <tbody style="line-height: inherit;">
                                      <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                         <td style="overflow-wrap: break-word;word-break: break-word;padding: 18px 50px 50px;font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" align="left">
                                            <div style="color: #5f5f5f; line-height: 140%; text-align: center; word-wrap: break-word;">
                                               <p style="font-size: 14px;line-height: 140%;text-align: center;margin: 0;"><span style="font-size: 12px; line-height: 16.8px;">We don't send any irrelevant email or
                                                  sell your data </span>
                                               </p>
                                            </div>
                                         </td>
                                      </tr>
                                   </tbody>
                                </table>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
              <div class="u-row-container" style="padding: 0px;background-color: transparent;line-height: inherit;">
                 <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #151418;line-height: inherit;width: calc(100% - 40px) !important;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;line-height: inherit;">
                       <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;line-height: inherit;width: 650px !important;">
                          <div style="width: 100% !important;line-height: inherit;margin: 0 auto;">
                             <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;line-height: inherit;">
                                <table style="font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                   <tbody style="line-height: inherit;">
                                      <tr style="line-height: inherit;vertical-align: top;border-collapse: collapse;">
                                         <td style="overflow-wrap: break-word;word-break: break-word;padding: 18px;font-family: 'Montserrat',sans-serif;line-height: inherit;color: #000000;vertical-align: top;border-collapse: collapse;" align="left">
                                            <div style="color: #ffffff; line-height: 100%; text-align: center; word-wrap: break-word;">
                                               <p style="font-size: 12px;line-height: 100%;margin: 0;">Copyright novaSocial @2022 | All Rights Reserved</p>
                                            </div>
                                         </td>
                                      </tr>
                                   </tbody>
                                </table>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </td>
        </tr>
     </tbody>
  </table>
</body>`;
};
module.exports = verificationEmailContent
