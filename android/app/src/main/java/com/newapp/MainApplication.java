package com.newapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.artirigo.fileprovider.RNFileProviderPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.rnfs.RNFSPackage;
import com.horcrux.svg.SvgPackage;
import cn.jystudio.local.barcode.recognizer.LocalBarcodeRecognizerPackage;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.newapp.DownloadApkPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new WebViewBridgePackage(),
            new RNCWebViewPackage(),
          new DownloadApkPackage(),
            new RNFileProviderPackage(),
            new SplashScreenReactPackage(),
            new RNFSPackage(),
            new SvgPackage(),
            new LocalBarcodeRecognizerPackage(),
            new ImagePickerPackage(),
            new RNCameraPackage(),
            new RNViewShotPackage(),
            new LinearGradientPackage(),
            new AsyncStoragePackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
