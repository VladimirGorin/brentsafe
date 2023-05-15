<div class="container magnum-keys-descr text-left">
      <h2 class="h2 text-left font-weight-normal mt-0 mt-sm-4">What is private key and what is a public key?</h2>
      <p class="magnum-keys-descr-text">SSL is based on the encryption of data using a private and a public key</p>
      <div class="magnum-keys-descr-row row">
        <div class="col col-12 col-sm-6">
          <div class="magnum-keys-descr-item">
            <h3 class="magnum-keys-descr-subtitle font-weight-normal h3">Private key</h3>
            <p class="magnum-keys-descr-text">A private key is created by converting a string of automatically generated text to a key file with the use of a mathematical algorithm, giving it a unique value. This private key file is then used to generate a Certificate Signing Request (CSR), which in turn can be used to create an SSL certificate. During the CSR process, a public key is generated. The private key must remain secret at all times. The private key s usen in the encryption process of certificate-signed data, and decryption of encrypted data.</p>
          </div>
          <div class="magnum-keys-descr-item">
            <h3 class="magnum-keys-descr-subtitle font-weight-normal h3">Public key</h3>
            <p class="magnum-keys-descr-text">The public key is generated during the CSR creation process and can be distributed publicly. A public key is used to encrypt information that is only intended for the owner of the private key. The combination go the private key can then be used to decrypt the information. A public key can also be used to verify the sender of a message as the owner of the private key.</p>
          </div>
        </div>
        <div class="col col-12 col-sm-6">
          <div class="magnum-keys-descr-item">
            <h3 class="magnum-keys-descr-subtitle font-weight-normal h3">Encryption algorithm</h3>
            <p class="magnum-keys-descr-text">The strength of the encryption of a certificate is largely inherent to the encryption algorithm that was used to generate the private key. Hackers are intent on breaking these encryption algorithms: if the algorithm is out in the open, it can be combined with a public key to find the corresponding private key. Until recently, the RSA algorithm was most commonly used, but the ECC of Elliptic Curve Cryptography algorithm is quickly growing in popularity. This algorithm can create a much smaller key while not using any strength when compared to the much larger RSA keys. For instance, an ECC key of 228 bits is just as safe as an RSA key of 2380 bits. More and more Certificate Authorities are therefore moving away from RSA in favour of ECC.</p>
          </div>
        </div>
      </div>
    </div>